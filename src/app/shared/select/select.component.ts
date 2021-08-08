import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { City } from '../../../model/city';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() list: City[] = [];
  @Output() selectionChange: EventEmitter<City> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selecting(selectedKey: string) {
    const item = this.list.find(({key}) => key === selectedKey);
    this.selectionChange.emit(item);
  }
}
