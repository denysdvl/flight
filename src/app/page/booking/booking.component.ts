import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flight } from '../../../model/flight';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  arrivalKey = '';
  departureDate: Date;
  departureKey = '';
  returnDate: Date;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookingItem: Params) => {
        this.arrivalKey = bookingItem.arrivalKey;
        this.departureKey = bookingItem.departureKey;
        this.departureDate = new Date(bookingItem.departureDate);
        this.returnDate = bookingItem.returnDate
          ? new Date(bookingItem.departureDate)
          : new Date();
      });
  }

  bookingItem(item: Flight) {
    this.router.navigate(['booking'], { queryParams: { ...item } });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
