import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { FlightService } from '../../../services/flight.service';
import { City } from '../../../interface/city';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { SelectList } from '../../../interface/select-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
})
export class SearchFlightComponent implements OnInit {
  flightCity: City[] = [];
  moment = moment;
  minDate: Date = new Date();
  errorarrivalDate = '';
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private flightService: FlightService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.setFlightCity();
  }

  setCity(city: SelectList, formControl: string): void {
    this.form.get(formControl)?.setValue(`${city.name} (${city.key})`);
    this.disabledCity(city.key);
  }

  setDepartureDate(date: Date): void {
    if (!date) {
      this.form.patchValue({
        departureDate: '',
        arrivalDate: '',
      });
      this.minDate = new Date();
      return;
    }
    this.form.patchValue({
      departureDate: moment(date).format('YYYY-MM-DD'),
    });
    this.minDate = date;
    this.setErrorForDate();
  }

  setArrivalDate(date: Date): void {
    this.form.get('arrivalDate')?.setValue(moment(date).format('YYYY-MM-DD'));
    this.setErrorForDate();
  }

  searchFlight(): void {
    const formData = {
      ...this.form.value,
    };
    this.flightService.searchFlight(
      formData.arrival,
      formData.departure,
      formData.departureDate,
      formData.arrivalDate
    );
    this.router.navigate(['home'], { queryParams: { ...formData } });
  }

  private setFlightCity(): void {
    this.cityService
      .getCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((city) => {
        this.flightCity = city;
      });
  }

  private creatForm(): void {
    this.form = this.fb.group({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      arrivalDate: new FormControl(''),
    });
  }

  private disabledCity(cityKey: string): void {
    this.flightCity = this.flightCity.map((item) => {
      return { ...item, disabled: item.key === cityKey };
    });
  }

  private setErrorForDate(): void {
    this.errorarrivalDate = '';
    const arrivalDate = this.form.get('arrivalDate');
    const departureDate = this.form.get('departureDate');
    if (
      arrivalDate &&
      departureDate &&
      arrivalDate.value.length &&
      new Date(departureDate.value) > new Date(arrivalDate.value)
    ) {
      this.errorarrivalDate = 'Data przylotu nie mo??e by?? wcze??niejsza.';
      this.form.get('arrivalDate')?.setErrors({ msg: this.errorarrivalDate });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
