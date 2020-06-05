import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService{

    public bookings: Booking[] = [
        {
            id: 'Xyz',
            placeId: 'P1',
            placeTitle: 'Manhattan Mension',
            guestNumber: 2,
            userId: 'Abc'
        }
     ];

   get booking() {
        return [...this.bookings];
    }
}

