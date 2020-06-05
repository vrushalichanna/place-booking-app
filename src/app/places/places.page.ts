import { Component, OnInit } from '@angular/core';
import { PlacesService } from './places.service';
import { Place } from './places.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  constructor(private placesService: PlacesService) { }

  ngOnInit() {

  }

}
