import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SelectList } from '../../../interface/selectList';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() placeholder = '';
  @Input() labelName = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() selected: string;
  @Input() list: SelectList[] = [];
  @Output() onFocus: EventEmitter<boolean> = new EventEmitter();
  @Output() selectionChange: EventEmitter<SelectList> = new EventEmitter();

  selecting(selectedKey: string): void {
    const item = this.list.find(({ key }) => key === selectedKey);
    this.selectionChange.emit(item);
  }
}
