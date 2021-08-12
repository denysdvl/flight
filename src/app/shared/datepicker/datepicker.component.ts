import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() labelName = '';
  @Input() error = '';
  @Input() date: Date;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter();
  @Input() minDate: Date = new Date();
  @Input() maxDate: Date = new Date(2021, 8, 20);

  dateChange(date: Date): void {
    this.selectDate.emit(date);
  }
}
