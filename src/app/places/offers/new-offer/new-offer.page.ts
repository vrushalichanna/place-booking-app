import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }
  onCreateMethod() {
    console.log(this.newOfferForm.value);
  }
}
