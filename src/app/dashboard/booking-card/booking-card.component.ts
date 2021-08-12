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
import { SelectList } from '../../../interface/select-list';
import { BookingService } from '../../../services/booking.service';
import { CityService } from '../../../services/city.service';

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
  flightCity: City[] = [];
  classList = [{ id: 1, key: 'Biznesowa', name: 'Biznesowa', disabled: false }];
  form: FormGroup;
  private destroy$ = new Subject();
  
  constructor(
    private bookingService: BookingService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.setFlightCity();
  }

  setValue(value: string, formControl: string): void {
    this.form.get(formControl)?.setValue(value.trim());
  }

  controlsTouched(formControl: string): void {
    this.form.get(formControl)?.markAsTouched();
  }

  submit(): void {
    this.bookingService.sendBookingFlight();
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
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      numberOfPeople: new FormControl('', Validators.required),
      typeClass: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
