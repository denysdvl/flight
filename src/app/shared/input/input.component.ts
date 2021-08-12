import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() labelName = '';
  @Input() type = 'text';
  @Input() error = '';
  @Output() changeInput: EventEmitter<string> = new EventEmitter();
  @Output() onFocus: EventEmitter<boolean> = new EventEmitter();

  valueChange(e: Event): void {
    this.changeInput.emit((e.target as HTMLInputElement).value);
  }
}
