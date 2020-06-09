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
   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2VH4ld_TrpysbMfCwVbG7xdX3VyrPuBRKvff4WDSoBrUlDiKu&usqp=CAU',
   149.99,
   new Date('2019-01-01'),
   new Date('2020-12-31')),
   new Place(
    'P2',
     'L\'Amour Toujours',
      'A romantic Place in Paris.!',
      'https://i.pinimg.com/originals/ae/6e/4a/ae6e4abae61dd26b816c8c08e4c4bd73.jpg',
   189.99,
   new Date('2019-01-01'),
   new Date('2019-12-31')),
   new Place(
    'P3',
     'The Foggy Palace',
      'Not your averge city trip!',
      'https://i.pinimg.com/236x/06/d9/94/06d994eff183f397b792f69ee86e0ec9--cloud-shapes-matte-painting.jpg',
   99.99,
   new Date('2019-01-01'),
   new Date('2019-12-31')),
   new Place(
    'P4',
     'Taj Mahal',
      'Best tourist place in India.!',
      'https://www.holidify.com/images/compressed/attractions/attr_1448.jpg',
   189.99,
   new Date('2019-01-01'),
   new Date('2019-12-31')),
];

get places() {
  return [...this._places];
}

getPlace(id: string) {
  return {...this._places.find(p => p.id === id )};
}
  constructor() { }
}
