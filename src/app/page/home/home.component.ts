import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flight } from '../../../interface/flight';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookingItem: Params) => {
        if (!Object.keys(bookingItem).length) {
          this.flightService.randomFlight();
          return;
        }
        this.flightService.searchFlight(
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
}
