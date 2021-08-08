import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../../model/flight';
import { FlightApi } from '../../../services/flight.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  flightList$: Observable<Flight[]> = this.flightApi.getFlightList();
  page = 1
  constructor(private flightApi: FlightApi) { }

  ngOnInit() {
    this.flightApi.randomFlight(this.page)
  }

  nextPage() {
    this.page = this.page + 1;
    this.flightApi.nextPage(this.page);
  }
}
