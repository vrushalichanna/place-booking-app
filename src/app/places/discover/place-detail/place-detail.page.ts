import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private activedRoute: ActivatedRoute,
    private navControl: NavController,
    private placeService: PlacesService,
    private modalCtrl: ModalController,
    private actionCntrl: ActionSheetController) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navControl.navigateBack('places/tabs/offers');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this.navControl.navigateBack('/places/tabs/discover');
    this.actionCntrl.create({
      header: 'Choose a Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModel('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModel('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then( actionEl => {
      actionEl.present();
    });

  }

  openBookingModel(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place }
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Booked.!');
        }
      });
  }
}
