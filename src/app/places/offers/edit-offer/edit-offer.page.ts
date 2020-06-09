import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  editOfferForm: FormGroup;

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
        this.editOfferForm = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.minLength(180)]
          }),
          imageUrl: new FormControl(this.place.imageUrl, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
        console.log(this.place);
    });


  }

  onEditMethod() {
    console.log(this.editOfferForm.value);
  }

}
