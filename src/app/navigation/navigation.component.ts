import { API } from './../data/api/app.api';
import { Component, OnInit } from '@angular/core';
import { User } from "../data/user/app.user";
import { CurrentState, AppState } from '../app.component';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isNavbarCollapsed = true;

  constructor(public api: API) { }

  ngOnInit(): void {
  }

  showAuthForm() {
    if (CurrentState.state !== AppState.Auth) {
      CurrentState.state = AppState.Auth;
    }
  }

  async tryFetch() {
    
  }
}
