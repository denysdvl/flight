import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
import { FlightApi } from '../../../services/flight.service';
import { City } from '../../../model/city';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectList } from '../../shared/select/select.component';
const moment = _moment;

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
})
export class SearchFlightComponent implements OnInit {
  flightCity: City[] = [];
  moment = _moment;
  minDate: Date = new Date();
  destroy$ = new Subject();
  errorarrivalDate = '';
  form: FormGroup = new FormGroup({
    departure: new FormControl('', Validators.required),
    arrival: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    arrivalDate: new FormControl(''),
  });
  constructor(private flightApi: FlightApi) {}

  ngOnInit(): void {
    this.flightApi
      .getCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((city) => {
        this.flightCity = city;
      });
  }

  randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  setCity(city: SelectList, formControl: string) {
    this.form.patchValue({
      [formControl]: `${city.name} (${city.key})`,
    });
    this.disabledCity(city.key);
  }

  disabledCity(cityKey: string) {
    this.flightCity = this.flightCity.map((item) => {
      return { ...item, disabled: item.key === cityKey };
    });
  }

  setDepartureDate(date: Date) {
    if (!date) {
      this.form.patchValue({
        departureDate: '',
        arrivalDate: '',
      });
      this.minDate = new Date();
      return;
    }
    this.form.patchValue({
      departureDate: moment(date).format('YYYY-MM-DD HH:mm'),
    });
    this.minDate = date;
    this.setErrorForDate();
  }

  setErrorForDate() {
    this.errorarrivalDate = '';
    const arrivalDate = this.form.get('arrivalDate');
    const departureDate = this.form.get('departureDate');
    if (
      arrivalDate &&
      departureDate &&
      arrivalDate.value.length &&
      new Date(departureDate.value) > new Date(arrivalDate.value)
    ) {
      this.errorarrivalDate = 'Data przylotu nie może być wcześniejsza.';
      this.form.get('arrivalDate')?.setErrors({ msg: this.errorarrivalDate });
    }
  }

  setarrivalDate(date: Date) {
    this.form.patchValue({
      arrivalDate: moment(date).format('YYYY-MM-DD HH:mm'),
    });
    this.setErrorForDate();
  }

  searchFlight() {
    const formData = {
      ...this.form.value,
    };
    this.flightApi.filterFlight(
      formData.arrival,
      formData.departure,
      formData.departureDate,
      formData.arrivalDate
    );
  }

  submit() {
    this.searchFlight();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
