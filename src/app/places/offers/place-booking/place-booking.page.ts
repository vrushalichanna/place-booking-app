import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-booking',
  templateUrl: './place-booking.page.html',
  styleUrls: ['./place-booking.page.scss'],
})
export class PlaceBookingPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;

  constructor(private activedRoute: ActivatedRoute,
              private navControl: NavController,
              private placeService: PlacesService) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navControl.navigateBack('places/tabs/offers');
        return;
      }
      this.placeSub = this.placeService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
