import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';


const MaterialComponents = [
  MatDatepickerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule,
  MatSelectModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
