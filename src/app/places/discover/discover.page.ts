import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-discover',

  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
loadedPlaces: Place[];
relevantPlaces: Place[];
listedLoadedPlaces: Place[];
private placeSub: Subscription;
isLoading = false;

  constructor(private placesService: PlacesService,
              private authService: AuthService ) { }

  ngOnInit() {
  this.placeSub = this.placesService.places.subscribe(place => {
    this.loadedPlaces = place;
    this.relevantPlaces = this.loadedPlaces;
    this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe( () => {
    this.isLoading = false;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(place =>
     place.userId !== this.authService.UserId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    console.log(event.detail);
       }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
