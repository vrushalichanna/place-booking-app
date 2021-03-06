import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCntrl: ModalController,
              private http: HttpClient) { }

  ngOnInit() {}

  onPickLocation() {
    this.modalCntrl.create({component: MapModalComponent})
    .then(modelEl => {
      modelEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(address => {
          console.log( address);
        });
      });
      modelEl.present();
    });
  }

  private getAddress(lat: number, lng: number) {
   return this.http.get<any>
   (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
      environment.googleMapsAPIKey}`
    ).pipe(map(geoData => {
      if (!geoData || !geoData.results || geoData.results.length === 0) {
        return null;
      }
      return geoData.results[0].formatted_address;
    }));
  }
}
