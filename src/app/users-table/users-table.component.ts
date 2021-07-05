import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INode } from '../data/node/app.node';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  title: string = 'Card title';
  cardLines: Array<string> = ['Card line'];

  editCompany = false;

  nodes: Array<INode> = [
    {
      user_id: 0,
      node_id: 0,
      node_name: 'Ivan',
      node_last_name: 'Ivanov',
      node_patronymic: 'Ivanovich',
      node_company: 'No Walls Production',
      node_phone: '+78005553535',
      node_create_date: new Date(),
      node_update_date: new Date()
    },
    {
      user_id: 1,
      node_id: 0,
      node_name: 'Petrov',
      node_last_name: 'Petr',
      node_patronymic: 'Petrovich',
      node_company: 'No Walls Production',
      node_phone: '84746364844',
      node_create_date: new Date(),
      node_update_date: new Date()
    },
    {
      user_id: 2,
      node_id: 0,
      node_name: 'Dimass',
      node_last_name: 'Semochkin',
      node_patronymic: 'Olegovich',
      node_company: 'No Walls Production',
      node_phone: '88442909090',
      node_create_date: new Date(),
      node_update_date: new Date()
    }
  ];
  
  closeResult: string = '';

  constructor(public modalService: NgbModal) {}

  public showCard(content: TemplateRef<any>, title: string, cardLines: Array<string>) {
    this.title = title;
    this.cardLines = cardLines;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  countries = COUNTRIES;

  test(e: HTMLInputElement, index: number) {
    this.cardLines[index] = e.value;
  }
}
