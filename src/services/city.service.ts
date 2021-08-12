import { Injectable } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { City } from '../interface/city';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
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
}
