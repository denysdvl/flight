import { Component, OnInit } from '@angular/core';
import { IconService } from '../services/icon.service';
import { City } from './../model/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  flightCity: City[] = []
  constructor(private iconService: IconService){}

  ngOnInit(): void {
  }
  title = 'flight';
}
