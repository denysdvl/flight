import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SelectComponent } from './shared/select/select.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { SearchFlightComponent } from './dashboard/search-flight/search-flight.component';
import { FlightCardComponent } from './dashboard/flight-card/flight-card.component';
import { HomeComponent } from './page/home/home.component';
import { BookingComponent } from './page/booking/booking.component';
import { InputComponent } from './shared/input/input.component';
import { BookingCardComponent } from './dashboard/booking-card/booking-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectComponent,
    DatepickerComponent,
    SearchFlightComponent,
    FlightCardComponent,
    HomeComponent,
    BookingComponent,
    InputComponent,
    BookingCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
