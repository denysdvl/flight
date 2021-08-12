import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flight } from '../../../interface/flight';
import { FlightApi } from '../../../services/flight.service';

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
  arrivalDate: Date;

  constructor(private route: ActivatedRoute, private router: Router, private flightApi: FlightApi) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookingItem: Params) => {
        this.arrivalKey = bookingItem.arrivalKey;
        this.departureKey = bookingItem.departureKey;
        this.departureDate = new Date(`${bookingItem.departureDate} ${bookingItem.departureTime}`);
        this.arrivalDate = new Date(`${bookingItem.arrivalDate} ${bookingItem.arrivalTime}`);
        this.flightApi.searchFlight(
          bookingItem.arrival,
          bookingItem.departure,
          bookingItem.departureDate,
          bookingItem.arrivalDate
        );
      });
  }

  bookingItem(item: Flight): void {
    this.router.navigate(['booking'], { queryParams: { ...item } });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
