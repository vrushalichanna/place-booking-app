import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  editOfferForm: FormGroup;
  private placeSub: Subscription;
  isLoading = false;
  placeId: string;
  constructor( private activedRoute: ActivatedRoute ,
               private navControl: NavController,
               private placeService: PlacesService,
               private router: Router,
               private loadingCntrl: LoadingController,
               private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.navControl.navigateBack('places/tabs/offers');
          return;
          }
        this.placeId = paramMap.get('placeId');
        this.isLoading = true;
        this.placeSub = this.placeService.getPlace(this.placeId).subscribe(place => {
          this.place =  place;
          this.editOfferForm = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.minLength(10)]
            }),
            imageUrl: new FormControl(this.place.imageUrl, {
              updateOn: 'blur',
              validators: [Validators.required]
            })
          });
          this.isLoading = false;
        },
        error => {
          this.alertCtrl
            .create({
              header: 'An error occurred!',
              message: 'Place could not be fetched. Please try again later.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/places/tabs/offers']);
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        }
        );

        console.log(this.place);
    });


  }

  onEditMethod() {
    if (!this.editOfferForm.valid) {
      return;
    }
    this.loadingCntrl.create({
      message: 'Updating Place...!'
    }).then(loadingEl => {
    loadingEl.present();
    this.placeService.updatePlace(this.place.id,
      this.editOfferForm.value.title,
      this.editOfferForm.value.description).subscribe(() => {
        loadingEl.dismiss();
        this.editOfferForm.reset();
        this.router.navigate(['/places/tabs/offers/']);
        });
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
