import { User } from './../data/user/app.user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor() { }

  register: boolean = false;

  registerSwitch() { this.register = !this.register; }

  ngOnInit(): void {
  }

  auth(login: string, pass: string) {
    User.authorizeUser(login, pass);
  }
}
