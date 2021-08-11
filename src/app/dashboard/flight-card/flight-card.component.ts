import { AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Flight } from '../../../model/flight';
import { FlightApi } from '../../../services/flight.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements AfterViewInit {
  flightList$: Observable<Flight[]> = this.flightApi.getFlightList();
  @Output() clickItem: EventEmitter<Flight> = new EventEmitter();
  @ViewChild('contentList') contentList: ElementRef;
  isMinSize = false;
  constructor(private flightApi: FlightApi, private cdRef: ChangeDetectorRef) {}

  nextPage() {
    this.flightApi.nextPage();
  }

  ngAfterViewInit() {
    this.isMinSize = this.contentList.nativeElement.clientWidth < 500;
    this.cdRef.detectChanges();
  }

  selectItem(item: Flight) {
    this.clickItem.emit(item);
  }
}
