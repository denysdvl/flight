import { Component, OnInit } from '@angular/core';
import { FlightApi } from '../services/flight.service';
import { IconService } from '../services/icon.service';
import { City } from './../model/city';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  flightCity: City[] = [];
  departure = '';
  arrival = '';
  destroy$ = new Subject();
  constructor(private flightApi: FlightApi, private iconService: IconService){}

  ngOnInit(): void {
    this.flightApi.getCity()
    .pipe(takeUntil(this.destroy$))
    .subscribe(city => {
      this.flightCity = city;
    })
  }

  selectedDepartureCity(cityKey: string) {
    this.departure = cityKey
    this.disabledCity(cityKey);
  }

  selectedArrivalCity(cityKey: string) {
    this.arrival = cityKey;
    this.disabledCity(cityKey);
  }

  disabledCity(cityKey: string) {
    this.flightCity = this.flightCity.map(item => {
      return { ...item, disabled: item.key === cityKey }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  title = 'flight';
}
