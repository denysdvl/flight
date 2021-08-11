import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { City } from '../../../model/city';

export interface SelectList {
  id: number;
  name: string;
  key: string;
  disabled: boolean;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder = '';
  @Input() labelName = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() selected: string;
  @Input() list: SelectList[] = [];
  @Output() onFocus: EventEmitter<boolean> = new EventEmitter();
  @Output() selectionChange: EventEmitter<SelectList> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selecting(selectedKey: string) {
    const item = this.list.find(({ key }) => key === selectedKey);
    this.selectionChange.emit(item);
  }
}
