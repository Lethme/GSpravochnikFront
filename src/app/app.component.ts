import { API } from './data/api/app.api';
import { Component, OnInit } from '@angular/core';
import { User } from "./data/user/app.user";

export enum AppState {
  Auth,
  App
}

export let CurrentState = {
  state: AppState.App
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public api: API) {  }
  ngOnInit() {
    if (this.api.UserToken === '') {
      CurrentState.state = AppState.Auth;
      this.api.Register = false;
    } else {
      CurrentState.state = AppState.App;
    }
  }

  title = 'AngularTestApp';

  get showAuthForm(): boolean { return CurrentState.state === AppState.Auth ? true : false; }
}
