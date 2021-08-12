import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingFlight$ = new BehaviorSubject<number>(2);

  sendBookingFlight(): void {
    const newCounter = this.bookingFlight$.getValue() + 1;
    this.bookingFlight$.next(newCounter);
  }

  getBookingFlight(): Observable<number> {
    return this.bookingFlight$.asObservable();
  }
}
