import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// new Place(
//   'P1',
//   'Manhattan Mansion',
//   'In the heart of New York city',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2VH4ld_TrpysbMfCwVbG7xdX3VyrPuBRKvff4WDSoBrUlDiKu&usqp=CAU',
//   149.99,
//   new Date('2019-01-01'),
//   new Date('2020-12-31'),
//   'ABC'),
// new Place(
//   'P2',
//   'L\'Amour Toujours',
//   'A romantic Place in Paris.!',
//   'https://i.pinimg.com/originals/ae/6e/4a/ae6e4abae61dd26b816c8c08e4c4bd73.jpg',
//   189.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'ABC',
// ),
// new Place(
//   'P3',
//   'The Foggy Palace',
//   'Not your averge city trip!',
//   'https://i.pinimg.com/236x/06/d9/94/06d994eff183f397b792f69ee86e0ec9--cloud-shapes-matte-painting.jpg',
//   99.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'ABC',
// ),
// new Place(
//   'P4',
//   'Taj Mahal',
//   'Best tourist place in India.!',
//   'https://www.holidify.com/images/compressed/attractions/attr_1448.jpg',
//   189.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'ABC',
// ),

interface PlaceData {
  availableFrom: string;
  description: string;
  availableTo: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line:variable-name
  private _places = new BehaviorSubject<Place[]>([
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  fetchPlaces() {
    return this.httpClient
      .get<{ [key: string]: PlaceData }>('https://ionic-angular-project-4d7ad.firebaseio.com/offered-places.json')
      .pipe(map(resData => {
        console.log(resData);
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(new Place(key,
              resData[key].title,
              resData[key].description,
              resData[key].imageUrl,
              resData[key].price,
              new Date(resData[key].availableFrom),
              new Date(resData[key].availableTo),
              resData[key].userId
            )
            );
          }
        }
        return places;
        // return [];
      }),
        tap(place => {
          this._places.next(place);
        })
      );
  }

  getPlace(id: string) {
    return this.httpClient.get<PlaceData>(`https://ionic-angular-project-4d7ad.firebaseio.com/offered-places/${id}.json`
    ).pipe(
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
          placeData.userId
        );
      })

    );
  }

  addPlace(title: string,
           description: string,
           price: number,
           dateFrom: Date,
           dateTo: Date
  ) {
    let generatedId;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2VH4ld_TrpysbMfCwVbG7xdX3VyrPuBRKvff4WDSoBrUlDiKu&usqp=CAU',
      price,
      dateFrom,
      dateTo,
      this.authService.UserId
    );
    return this.httpClient
      .post<{ name: string }>(
        'https://ionic-angular-project-4d7ad.firebaseio.com/offered-places.json',
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),>>>
    //   delay(1000),
    //   tap(places => {
    //     this._places.next(places.concat(newPlace));
    // })
    // );
  }


  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1), switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedplaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedplaceIndex];
        updatedPlaces[updatedplaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
        );
        return this.httpClient.put(`https://ionic-angular-project-4d7ad.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedplaceIndex], id: null },
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
