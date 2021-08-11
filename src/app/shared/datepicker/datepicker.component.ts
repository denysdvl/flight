import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() labelName = '';
  @Input() error = '';
  @Input() date: Date;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter();
  @Input() minDate: Date = new Date();
  constructor() {}

  ngOnInit() {}

  dateChange(date: Date) {
    this.selectDate.emit(date);
  }
}
