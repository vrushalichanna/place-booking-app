import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './bookings.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
loadedBookings: Booking[];
private bookingsub: Subscription;
isLoading = false;

  constructor(private bookingService: BookingService,
              private loadingCnrtl: LoadingController) { }

  ngOnInit() {
     this.bookingsub = this.bookingService.bookings.subscribe(booking => {
      this.loadedBookings  = booking;
     });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancelBooking(bookingId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadingCnrtl.create({
      message: ' Cancelling booking..!'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });

    });
  }

  ngOnDestroy() {
    if (this.bookingsub) {
      this.bookingsub.unsubscribe();
    }
  }
}
