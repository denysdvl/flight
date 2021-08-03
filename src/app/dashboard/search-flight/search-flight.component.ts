import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
import { FlightApi } from '../../../services/flight.service';
import { IconService } from '../../../services/icon.service';
import { City } from '../../../model/city';
const moment = _moment;

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
})
export class SearchFlightComponent implements OnInit {
  flightCity: City[] = [];
  departure = '';
  arrival = '';
  departureDate = '';
  returnDate = '';
  moment = _moment;
  minDate: Date = new Date();
  destroy$ = new Subject();
  errorReturnDate = '';
  constructor(private flightApi: FlightApi, private iconService: IconService) {}

  ngOnInit(): void {
    this.flightApi
      .getCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((city) => {
        this.flightCity = city;
      });
  }

  setDepartureCity(cityKey: string) {
    this.departure = cityKey;
    this.disabledCity(cityKey);
  }

  setArrivalCity(cityKey: string) {
    this.arrival = cityKey;
    this.disabledCity(cityKey);
  }

  disabledCity(cityKey: string) {
    this.flightCity = this.flightCity.map((item) => {
      return { ...item, disabled: item.key === cityKey };
    });
  }

  setDepartureDate(date: Date) {
    if (!date) {
      this.departureDate = '';
      this.returnDate = '';
      this.minDate = new Date();
      return;
    }
    this.errorReturnDate = ''
    this.departureDate = moment(date).format('YYYY-MM-DD HH:mm');
    this.minDate = date;
    if (this.returnDate.length && date > new Date(this.returnDate)) {
      this.errorReturnDate = 'Data przylotu nie może być wcześniejsza.'
    }
  }

  setReturnDate(date: Date) {
    this.returnDate = moment(date).format('YYYY-MM-DD HH:mm');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
