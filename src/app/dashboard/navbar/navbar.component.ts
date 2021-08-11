import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightApi } from '../../../services/flight.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  bookingFlight$: Observable<number> = this.flightApi.getBookingFlight();

  constructor(private flightApi: FlightApi) {}

  ngOnInit() {}
}
