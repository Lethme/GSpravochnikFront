import { Component } from '@angular/core';
import { User } from "./data/user/app.user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {  }
  title = 'AngularTestApp';
}
