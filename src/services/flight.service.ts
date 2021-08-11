import { Injectable } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import * as _moment from 'moment';
import { City } from '../model/city';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Flight } from '../model/flight';
const moment = _moment;

@Injectable({
  providedIn: 'root',
})
export class FlightApi {
  private flightList$ = new BehaviorSubject<Flight[]>([]);
  private flightParam$ = new BehaviorSubject<HttpParams>(new HttpParams());
  private departureDate$ = new BehaviorSubject<string>(
    moment(new Date()).format('YYYY-MM-DD HH:mm')
  );
  private bookingFlight$ = new BehaviorSubject<number>(2);
  private pageList = 1;
  constructor(private apiService: ApiService) {}

  getCity(): Observable<City[]> {
    return this.apiService.get<City[]>('city').pipe(
      map((city) =>
        city.map((item) => {
          return { ...item, disabled: false };
        })
      )
    );
  }

  sendBookingFlight() {
    const newCounter = this.bookingFlight$.getValue() + 1;
    this.bookingFlight$.next(newCounter);
  }

  filterFlight(
    arrival: string,
    departure: string,
    departureDate: string,
    arrivalDate: string
  ): void {
    this.pageList = 1;
    const params = new HttpParams()
      .set('_sort', 'departureDate')
      .set('_page', this.pageList.toString())
      .set('departure', departure)
      .set('arrival', arrival);
    this.departureDate$.next(departureDate);
    this.flightParam$.next(params);
    this.setFlight(params);
  }

  randomFlight(): void {
    this.pageList = 1;
    const params = new HttpParams()
      .set('_sort', 'departureDate')
      .set('_page', this.pageList.toString());
    this.flightParam$.next(params);
    this.setFlight(params);
  }

  nextPage(): void {
    ++this.pageList;
    const params = this.flightParam$
      .getValue()
      .set('_page', this.pageList.toString());
    this.setFlight(params);
  }

  setFlight(params: HttpParams): void {
    this.apiService
      .get<Flight[]>('flight', { params: params })
      .subscribe(this.updateList.bind(this));
  }

  updateList(flightList: Flight[]) {
    const departureDate = this.departureDate$.getValue();
    const filterList = flightList.filter(
      (item) =>
        new Date(item.departureDate) > new Date(departureDate) ||
        new Date(item.departureDate) === new Date(departureDate)
    );
    const oldList = this.flightList$.getValue();
    if (this.pageList === 1) {
      this.flightList$.next(filterList);
      return;
    }
    const newList = [...oldList, ...filterList];
    this.flightList$.next(newList);
  }

  getFlightList(): Observable<Flight[]> {
    return this.flightList$.asObservable();
  }

  getBookingFlight(): Observable<number> {
    return this.bookingFlight$.asObservable();
  }
}
