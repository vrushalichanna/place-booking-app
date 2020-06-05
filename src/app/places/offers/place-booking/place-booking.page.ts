import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-booking',
  templateUrl: './place-booking.page.html',
  styleUrls: ['./place-booking.page.scss'],
})
export class PlaceBookingPage implements OnInit {
place: Place;
  constructor( private activedRoute: ActivatedRoute ,
               private navControl: NavController,
               private placeService: PlacesService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.navControl.navigateBack('places/tabs/offers');
          return;
          }
        this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }

}
