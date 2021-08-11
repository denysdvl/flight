import { Component, OnInit } from '@angular/core';
import { FlightApi } from '../services/flight.service';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private iconService: IconService, private flightApi: FlightApi) { }

  ngOnInit() {
    this.flightApi.randomFlight();
  }
}
