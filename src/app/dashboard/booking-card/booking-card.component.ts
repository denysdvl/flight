import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City } from '../../../interface/city';
import { SelectList } from '../../../interface/selectList';
import { BookingApi } from '../../../services/booking.service';
import { CityApi } from '../../../services/city.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {
  @Input() arrivalKey = '';
  @Input() departureDate: Date;
  @Input() departureKey = '';
  @Input() arrivalDate: Date;
  private destroy$ = new Subject();
  flightCity: City[] = [];
  classList = [{ id: 1, key: 'Biznesowa', name: 'Biznesowa', disabled: false }];
  form: FormGroup;
  constructor(
    private bookingApi: BookingApi,
    private cityApi: CityApi,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.setFlightCity();
  }

  private setFlightCity(): void {
    this.cityApi
      .getCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((city) => {
        this.flightCity = city;
      });
  }

  private creatForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      numberOfPeople: new FormControl('', Validators.required),
      typeClass: new FormControl('', Validators.required),
    });
  }
  setValue(value: string, formControl: string): void {
    this.form.get(formControl)?.setValue(value.trim());
  }

  controlsTouched(formControl: string): void {
    this.form.get(formControl)?.markAsTouched();
  }

  submit(): void {
    this.bookingApi.sendBookingFlight();
  }

  getError(formControl: string): string {
    const control = this.form.get(formControl);
    if (!control) {
      return '';
    }
    const isNotValid = control.touched && control.status === 'INVALID';
    return isNotValid ? 'To pole jest wymagane.' : '';
  }

  selectClass(selectClass: SelectList): void {
    this.form.get('typeClass')?.setValue(selectClass.key);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
