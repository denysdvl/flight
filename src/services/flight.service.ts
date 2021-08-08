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
  constructor(private apiService: ApiService) {}

  getCity(): Observable<City[]> {
    return this.apiService.get<City[]>('city').pipe(
      map(city => city.map(item => {
          return { ...item, disabled: false };
        })
      )
    );
  }

  filterFlight(
    arrival: string,
    departure: string,
    departureDate: string,
    page = 1
  ): void {
    const params = new HttpParams()
      .set('_sort', 'departureDate')
      .set('_page', '1')
      .set('departure', departure)
      .set('arrival', arrival);
    this.departureDate$.next(departureDate);
    this.flightParam$.next(params);
    this.getFlight(params).pipe(tap((flightList) => this.updateList(flightList, page.toString()))).subscribe();
  }

  randomFlight(page: number): void {
    const params = new HttpParams()
      .set('_sort', 'departureDate')
      .set('_page', '1');
    this.flightParam$.next(params);
    this.getFlight(params).pipe(tap((flightList) => this.updateList(flightList, page.toString()))).subscribe();
  }

  nextPage(page: number): void {
    const params = this.flightParam$.getValue();
    this.getFlight(params).pipe(tap((flightList) => this.updateList(flightList, page.toString()))).subscribe();
  }

  getFlight(params: HttpParams): Observable<Flight[]> {
    return this.apiService.get<Flight[]>('flight', { params: params });
  }

  updateList(flightList: Flight[], page: string) {
    const departureDate = this.departureDate$.getValue();
    flightList = flightList.filter(
      (item) =>
        new Date(item.departureDate) > new Date(departureDate) ||
        new Date(item.departureDate) === new Date(departureDate)
    );
    const oldList = this.flightList$.getValue();
    const newList = page === '1' || !oldList.length ? flightList : [...oldList, ...flightList.slice(oldList.length - 1, oldList.length + 9)];
    this.flightList$.next(newList);
  }

  getFlightList(): Observable<Flight[]> {
    return this.flightList$.asObservable();
  }
}
