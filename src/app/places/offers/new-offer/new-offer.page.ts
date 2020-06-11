import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  newOfferForm: FormGroup = new FormGroup({
    title: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    description: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(20)]
    }),
    price: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    dateFrom: new FormControl(null, {
      validators: [Validators.required]
    }),
    dateTo: new FormControl(null, {
      validators: [Validators.required]
    }),
  });

  constructor(private placeService: PlacesService,
              private router: Router,
              private loadingCntrl: LoadingController) { }

  ngOnInit() {
  }

  onCreateOffer() {
    if (!this.newOfferForm.valid) {
      return;
    }
    this.loadingCntrl.create({
      message: 'Creating Place...',
    }).then(loadingEl => {
      loadingEl.present();
      this.placeService.addPlace(this.newOfferForm.value.title,
        this.newOfferForm.value.description,
        +this.newOfferForm.value.price,
        new Date(this.newOfferForm.value.dateFrom),
        new Date(this.newOfferForm.value.dateTo)
        ).subscribe(() => {
          loadingEl.dismiss();
          this.newOfferForm.reset();
          this.router.navigate(['/places/tabs/offers']);
        });
    });

  }
}
