import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
import { FlightApi } from '../../../services/flight.service';
import { IconService } from '../../../services/icon.service';
import { City } from '../../../model/city';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  form: FormGroup = new FormGroup({
    departure: new FormControl('', Validators.required),
    arrival: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    returnDate: new FormControl('')
  });
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
    this.form.patchValue({
      departure: cityKey, 
    });
    this.disabledCity(cityKey);
  }

  setArrivalCity(cityKey: string) {
    this.form.patchValue({
      arrival: cityKey, 
    });
    this.disabledCity(cityKey);
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
        returnDate: '', 
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
    this.errorReturnDate = ''
    const returnDate = this.form.get('returnDate');
    const departureDate = this.form.get('departureDate');
    if (returnDate && departureDate && returnDate.value.length && new Date(departureDate.value) > new Date(returnDate.value)) {
      this.errorReturnDate = 'Data przylotu nie może być wcześniejsza.';
      this.form.get('returnDate')?.setErrors({'msg': this.errorReturnDate});
    }
  }

  setReturnDate(date: Date) {
    this.form.patchValue({
      returnDate: moment(date).format('YYYY-MM-DD HH:mm'), 
    });
    this.setErrorForDate();
  }

  submit() {
    console.log(this.form);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
