import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: any[] = [];

  constructor() { }

  makeBooking(bookingDetails: any): void {
    this.bookings.push(bookingDetails);
    console.log('Reserva Confirmada:', bookingDetails);
  }
}
