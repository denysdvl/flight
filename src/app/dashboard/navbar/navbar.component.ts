import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  bookingFlight$: Observable<number> = this.bookingService.getBookingFlight();

  constructor(private bookingService: BookingService) {}
}
