import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppUiModule } from "./app-ui.module";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersTableComponent } from "./users-table/users-table.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { LoaderComponent } from './loader/loader.component';

import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsersTableComponent,
    PhonePipe,
    LoginFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    NgbModule,
    AppUiModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
