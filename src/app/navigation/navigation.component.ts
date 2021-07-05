import { Component, OnInit } from '@angular/core';
import { User } from "../data/user/app.user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isNavbarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  async tryFetch() {
    User.getUsers().then(users => {
      console.log(users);
    });
  }
}
