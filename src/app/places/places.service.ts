import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
// tslint:disable-next-line:variable-name
private _places: Place[] = [
  new Place(
    'P1',
     'Manhattan Mansion',
      'In the heart of New York city',
   'https://static2.mansionglobal.com/production/media/article-images/2f6a5dc3d80ef19f3bc23ddc1e911adf/medium_Screen-Shot-2017-12-07-at-12.11.10-PM.png',
   149.99),
   new Place(
    'P2',
     'L\'Amour Toujours',
      'A romantic Place in Paris.!',
      'https://i.pinimg.com/originals/ae/6e/4a/ae6e4abae61dd26b816c8c08e4c4bd73.jpg',
   189.99),
   new Place(
    'P3',
     'The Foggy Palace',
      'Not your averge city trip!',
      'data:image/jpeg;base64,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',
   99.99)
];

get places() {
  return [...this._places];
}

getPlace(id: string) {
  return {...this._places.find(p => p.id === id )};
}
  constructor() { }
}
