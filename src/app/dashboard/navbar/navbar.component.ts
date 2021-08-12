import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingApi } from '../../../services/booking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  bookingFlight$: Observable<number> = this.bookingApi.getBookingFlight();

  constructor(private bookingApi: BookingApi) {}
}
