import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppUiModule } from "./app-ui.module";
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersTableComponent } from "./users-table/users-table.component";

import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavigationComponent,
    UsersTableComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    NgbModule,
    AppUiModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
