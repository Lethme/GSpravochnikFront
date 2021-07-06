import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Node } from '../data/node/app.node';

export interface ICardInfo {
  type: 'msg' | 'ti' | 'dp' | 'tp';
  title: string;
  date: Date;
  time: NgbTimeStruct;
  cardLines: Array<string>;
}

const Nodes: Array<Node> = [
  Node.Create(0, 0, 'Dimass', 'Semochkin', 'Olegovich', 'No Walls Production', '88005553535', new Date(), new Date()),
  Node.Create(1, 0, 'Ivan', 'Ivanov', 'Ivanovich', 'No Walls Production', '+74468487636', new Date(), new Date()),
  Node.Create(2, 0, 'Test', 'Testov', 'Testovich', 'No Walls Production', '33563563565', new Date(), new Date()),
  Node.Create(3, 0, 'JHGJHK', 'Testov', 'Testovich', 'No Walls Production', '33563563565', new Date(), new Date()),
  Node.Create(4, 0, 'GOVNO', 'Testov', 'Testovich', 'No Walls Production', '33563563565', new Date(), new Date()),
  Node.Create(5, 0, 'DHKJHDKJG', 'Testov', 'Testovich', 'No Walls Production', '33563563565', new Date(), new Date())
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  card: ICardInfo = {
    type: 'msg',
    title: 'Card Title',
    date: new Date(),
    time: { hour: 0, minute: 0, second: 0 },
    cardLines: []
  }

  nodes: Array<Node> = Nodes;
  page = 1;
  pageSize: Array<number> = [ 2, 4, 6, 8, 10 ];
  selectedItem = 1;

  model: NgbDateStruct | undefined;

  get collectionSize(): number { return this.nodes.length; }
  get currentPageSize(): number { return this.pageSize[this.selectedItem]; }

  getPagedNodes(): Array<Node> {
    return this.nodes.slice((this.page - 1) * this.currentPageSize, (this.page - 1) * this.currentPageSize + this.currentPageSize);
  }

  constructor(public modalService: NgbModal) {}

  public showMsg(content: TemplateRef<any>, title: string = 'Card Title', cardLine: Array<string> = []) {
    this.card.type = 'msg';
    this.card.title = title;
    this.card.cardLines = cardLine;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  public showTextInput(content: TemplateRef<any>, title: string = 'Card Title') {
    this.card.type = 'ti';
    this.card.title = title;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  public showDatePicker(content: TemplateRef<any>, title: string = 'Card Title', date: Date = new Date()) {
    this.card.type = 'dp';
    this.card.title = title;
    this.card.date = date;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  public showTimePicker(content: TemplateRef<any>, title: string = 'Card Title', time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 }) {
    this.card.type = 'tp';
    this.card.title = title;
    this.card.time = time;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  test(e: HTMLInputElement, index: number) {
    this.card.cardLines[index] = e.value;
  }
}
