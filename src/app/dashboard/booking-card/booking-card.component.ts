import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City } from '../../../model/city';
import { Flight } from '../../../model/flight';
import { FlightApi } from '../../../services/flight.service';
import { SelectList } from '../../shared/select/select.component';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {
  destroy$ = new Subject();
  value = '';
  flightCity: City[] = [];
  @Input() arrivalKey = '';
  @Input() departureDate: Date;
  @Input() departureKey = '';
  @Input() returnDate: Date;
  classList = [{ id: 1, key: 'Biznesowa', name: 'Biznesowa', disabled: false }];
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    numberOfPeople: new FormControl('', Validators.required),
    typeClass: new FormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightApi: FlightApi
  ) {}

  ngOnInit() {
    this.flightApi
      .getCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((city) => {
        this.flightCity = city;
      });
  }

  bookingItem(item: Flight) {
    this.router.navigate(['booking'], { queryParams: { ...item } });
  }

  setValue(e: string, formControl: string) {
    this.form.patchValue({
      [formControl]: e.trim(),
    });
  }

  controlsTouched(formControl: string): void {
    const control = this.form.get(formControl);
    control?.markAsTouched();
  }

  submit() {
    const formData = {
      ...this.form.value,
    };
  }

  getError(formControl: string): string {
    const control = this.form.get(formControl);
    if (!control) {
      return '';
    }
    const isNotValid = control.touched && control.status === 'INVALID';
    return isNotValid ? 'To pole jest wymagane.' : '';
  }

  setClass(e: SelectList) {
    this.form.patchValue({
      typeClass: e.key,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
