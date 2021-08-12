import { AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Flight } from '../../../interface/flight';
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

  nextPage(): void {
    this.flightApi.nextPage();
  }

  ngAfterViewInit(): void {
    this.isMinSize = this.contentList.nativeElement.clientWidth < 500;
    this.cdRef.detectChanges();
  }

  selectItem(item: Flight): void {
    this.clickItem.emit(item);
  }
}
