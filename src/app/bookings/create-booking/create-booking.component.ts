import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../places/places.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input() selectedPlace: Place;
  constructor(private modelCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.selectedPlace);
  }

  onBookPlace() {
    this.modelCtrl.dismiss({message: 'This is a Dummy message'} , 'confirm');
  }

  onCancel() {
this.modelCtrl.dismiss(null, 'Cancel');
  }
}
