import { Injectable } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { City } from '../model/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightApi {
  constructor(private apiService: ApiService) {}

  getCity(): Observable<City[]> {
    return this.apiService.get<City[]>('city');
  }
}
