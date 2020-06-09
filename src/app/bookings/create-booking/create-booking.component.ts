import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from '../../places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input() selectedPlace: Place;
@Input() selectedMode: 'select' | 'random' ;
@ViewChild('bookingForm') dateForm: NgForm;
startDate: string;
endDate: string;

  constructor(private modelCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.selectedPlace);
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
      availableFrom.getTime() +
      Math.random() *
      (availableTo.getTime() -
       7 * 24 * 60 * 60 * 1000 -
       availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
       new Date(this.startDate).getTime() +
       Math.random() *
       (new Date(this.startDate).getTime() +
       6 * 24 * 60 * 60 * 1000 -
       new Date(this.startDate).getTime())
       ).toISOString();
    }
  }

  onBookPlace() {
  if (!this.dateForm.valid || !this.datesValid) {
    return;
  }

  this.modelCtrl.dismiss({bookingDate: {
    firstName: this.dateForm.value['firstName'],
    lastName: this.dateForm.value['lastName'],
    guestNumber: this.dateForm.value['guestNo'],
    startDate: this.dateForm.value['dateFrom'],
    endDate: this.dateForm.value['dateTo'],
    } } , 'confirm');
  }

  onCancel() {
this.modelCtrl.dismiss(null, 'Cancel');
  }

  datesValid() {
    const fromDate = new Date( this.dateForm.value['startDate']);
    const toDate = new Date (this.dateForm.value['endDate']);
    return toDate > fromDate ;
  }
}
