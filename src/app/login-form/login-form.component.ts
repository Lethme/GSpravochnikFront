import { API } from './../data/api/app.api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor(public api: API) { }
  ngOnInit(): void { }
}
