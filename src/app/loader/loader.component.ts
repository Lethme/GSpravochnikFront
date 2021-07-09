import { API } from './../data/api/app.api';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public api: API) { }

  ngOnInit(): void {
  }

}
