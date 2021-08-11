import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() labelName = '';
  @Input() type = 'text';
  @Input() error = '';
  @Output() changeInput: EventEmitter<string> = new EventEmitter();
  @Output() onFocus: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  valueChange(e: Event) {
    this.changeInput.emit((e.target as HTMLInputElement).value);
  }
}
