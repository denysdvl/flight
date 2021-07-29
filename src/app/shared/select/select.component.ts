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
  @Output() selectionChange: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selecting(selectedKey: string) {
    this.selectionChange.emit(selectedKey);
  }
}
