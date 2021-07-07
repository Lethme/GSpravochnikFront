import { Component } from '@angular/core';
import { User } from "./data/user/app.user";

export enum AppState {
  Auth,
  App
}

export let CurrentState = {
  state: AppState.Auth
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {  }
  title = 'AngularTestApp';
  
  get showAuthForm(): boolean { return CurrentState.state === AppState.Auth ? true : false; }
}
