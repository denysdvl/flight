import { Injectable } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import * as moment from 'moment';
import { City } from '../interface/city';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Flight } from '../interface/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightApi {
  private flightList$ = new BehaviorSubject<Flight[]>([]);
  private flightParam$ = new BehaviorSubject<HttpParams>(new HttpParams());
  private departureDate$ = new BehaviorSubject<string>(
    moment(new Date()).format('YYYY-MM-DD HH:mm')
  );
  private pageList = 1;
  constructor(private apiService: ApiService) {}

  searchFlight(
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
      .set('arrival', arrival)
      .set('departureDate', departureDate);
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

  private setFlight(params: HttpParams): void {
    this.apiService
      .get<Flight[]>('flight', { params: params })
      .subscribe(this.updateList.bind(this));
  }

  private updateList(flightList: Flight[]): void {
    const oldList = this.flightList$.getValue();
    const list = this.pageList === 1 ? flightList : [...oldList, ...flightList];
    this.flightList$.next(list);
  }

  getFlightList(): Observable<Flight[]> {
    return this.flightList$.asObservable();
  }
}
