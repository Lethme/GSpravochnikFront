import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Node } from '../data/node/app.node';

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
  title: string = 'Card title';
  cardLines: Array<string> = ['Card line'];
  nodes: Array<Node> = Nodes;
  page = 1;
  pageSize = 3;
  selectedItem = 0;

  get collectionSize(): number { return this.nodes.length; }

  getPagedNodes(): Array<Node> {
    return this.nodes.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  constructor(public modalService: NgbModal) {}

  public showCard(content: TemplateRef<any>, title: string, cardLines: Array<string>) {
    this.title = title;
    this.cardLines = cardLines;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  test(e: HTMLInputElement, index: number) {
    this.cardLines[index] = e.value;
  }
}
