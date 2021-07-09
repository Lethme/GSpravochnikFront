import { API } from './../data/api/app.api';
import { INode } from './../data/node/app.node';
import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Node, INewNode } from '../data/node/app.node';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppState, CurrentState } from '../app.component';

export interface ICardInfo {
  type: 'add' | 'edit';
  title: string;
  date: Date;
  time: NgbTimeStruct;
  cardLines: Array<string>;
  colTitles: Array<string>;
  node: Node | null;
}

export interface IPageInfo {
  index: number;
  size: Array<number>;
  collectionSize: number;
  sizeDropdownSelectedItem: number;
}

export interface ITableInfo {
  headers: Array<string>;
}

// const Nodes: Array<Node> = [
//   new Node(0, 0, 'Dimass', 'Semochkin', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(1, 0, 'FDFGDSF', 'GDGDGH', 'dghdgh', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(2, 0, 'dghdghd', 'Semocdghdghhkin', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(3, 0, 'Dimadghdghdgss', 'Semochkin', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(4, 0, 'dghdg', 'Semochkin', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(5, 0, 'ghdgdghdgh', 'dghdghdg', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true),
//   new Node(6, 0, 'Dimdghdghass', 'dghdg365', 'Olegovich', 'No Walls Production', '88005553535', 'govno@mail.ru', new Date(), new Date(), true)
// ];

const Nodes: Array<Node> = [];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  card: ICardInfo = {
    type: 'edit',
    title: 'Card Title',
    date: new Date(),
    time: { hour: 0, minute: 0, second: 0 },
    cardLines: [''],
    colTitles: [''],
    node: null
  }
  page: IPageInfo = {
    index: 1,
    size: [ 2, 4, 6, 8, 10 ],
    collectionSize: 0,
    sizeDropdownSelectedItem: this.api.SizeDropDownItem
  }
  table: ITableInfo = {
    headers: [
      'Name',
      'Company',
      'Phone',
      'Email'
    ]
  }
  
  nodes: Array<Node> = Nodes;
  model: NgbDateStruct | undefined;

  constructor(public modalService: NgbModal, private http: HttpClient, private cookie: CookieService, public api: API) {
  }
  ngOnInit(): void {
    if (this.api.getData<any>(this.api.StoragePageIndex) === undefined) {
      this.api.PageIndex = this.page.index;
    }
    if (this.api.getData<any>(this.api.StorageSizeDropDownItem) === undefined) {
      this.api.SizeDropDownItem = this.page.sizeDropdownSelectedItem;
    }
    this.apiGetPageNodes();
  }

  get currentPageSize(): number { return this.page.size[this.page.sizeDropdownSelectedItem]; }
  get userToken(): string { return this.cookie.get('authToken'); }
  
  public get userName(): string { return this.cookie.get('authLogin'); }

  apiGetNodes() {
    if (this.api.Authorized) {
      this.api.Loading = true;
      this.http.get<any>(this.api.getUrl('nodes'), {
        headers: this.api.AuthHeader
      }).subscribe(data => {
        let nodesCount: number = data.meta.count;
        let arr: Array<any> = data.data;
        let arr1: Array<INode> = arr.map(node => {
          return node.attributes;
        });
        if (arr1[0] !== undefined) {
          this.nodes = arr1.map(node => Node.Create(node));
        } else {
          this.nodes = [];
        }
        this.page.collectionSize = nodesCount;
        this.api.Loading = false;
      }, err => {
        console.log(err);
        this.api.Loading = false;
      });
    } else {
      CurrentState.state = AppState.Auth;
    }
  }

  apiGetPageNodes() {
    if (this.api.Authorized) {
      this.api.Loading = true;
      this.http.get<any>(this.api.getUrl('nodes', {
        pageSize: this.currentPageSize,
        pageNum: this.api.PageIndex
      }), {
        headers: this.api.AuthHeader
      }).subscribe(data => {
        let nodesCount: number = data.meta.count;
        let arr: Array<any> = data.data;
        let arr1: Array<INode> = arr.map(node => {
          return node.attributes;
        });
        if (arr1[0] !== undefined) {
          this.nodes = arr1.map(node => Node.Create(node));
        } else {
          this.nodes = [];
        }
        this.page.index = this.api.PageIndex;
        this.page.collectionSize = nodesCount;
        this.api.Loading = false;
      }, err => {
        console.log(err);
        this.api.Loading = false;
      });
    } else {
      CurrentState.state = AppState.Auth;
    }
  }

  apiSetNode(nodeId: number, node: Node | undefined) {
    if (this.api.Authorized) {
      this.api.Loading = true;
      this.http.patch<any>(this.api.getUrl('nodes/' + nodeId), JSON.stringify({
        nodeName: node?.Name,
        nodeLastName: node?.LastName,
        nodePatronymic: node?.Patronymic,
        nodeCompany: node?.Company,
        nodePhone: node?.Phone,
        nodeEmail: node?.Email,
        isPublic: node?.Public
      }), {
        headers: this.api.AuthHeader
      }).subscribe(data => {
        this.apiGetPageNodes();
        this.api.Loading = false;
      }, err => {
        let status: number = err.status;
        switch(status) {
          case 400: {
            let errors: Array<string> = err.error.errors;
            alert(errors.join('\n'));
            break;
          }
          case 500: {
            console.log(err);
          }
        }
        this.api.Loading = false;
      });
    } else {
      CurrentState.state = AppState.Auth;
    }
  }

  apiDeleteNode(nodeId: number) {
    if (this.api.Authorized) {
      this.api.Loading = true;
      this.http.delete<any>(this.api.getUrl('nodes/' + nodeId), {
        headers: this.api.AuthHeader
      }).subscribe(data => { 
        this.apiGetPageNodes();
        this.api.Loading = false;
      }, err => {
        let status: number = err.status;
        switch(status) {
          case 400: {
            let errors: Array<string> = err.error.errors;
            alert(errors.join('\n'));
            break;
          }
          case 500: {
            console.log(err);
          }
        }
        this.api.Loading = false;
      });
    } else {
      CurrentState.state = AppState.Auth;
    }
  }

  apiAddNode(newNode: INewNode) {
    if (this.api.Authorized) {
      this.api.Loading = true;
      this.http.post<any>(this.api.getUrl('nodes/'), JSON.stringify({
        nodeName: newNode.name,
        nodeLastName: newNode.lastName,
        nodePatronymic: newNode.patronymic,
        nodeCompany: newNode.company,
        nodePhone: newNode.phone,
        nodeEmail: newNode.email,
        isPublic: false
      }), {
        headers: this.api.AuthHeader
      }).subscribe(data => {
        this.page.collectionSize++;
        if (this.page.collectionSize % this.currentPageSize === 1) {
          this.page.index++;
        }
        this.apiGetPageNodes();
      }, err => {
        let status: number = err.status;
        switch(status) {
          case 400: {
            let errors: Array<string> = err.error.errors;
            alert(errors.join('\n'));
            break;
          }
          case 500: {
            console.log(err);
          }
        }
        this.api.Loading = false;
      });
    } else {
      CurrentState.state = AppState.Auth;
    }
  }

  showNodeEditor(content: TemplateRef<any>, node: Node) {
    this.card.type = 'edit';
    this.card.node = node;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  showNewNodeEditor(content: TemplateRef<any>) {
    this.card.type = 'add';
    this.card.node = Node.CreateEmpty();
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  showConfirm(content: TemplateRef<any>, node: Node) {
    this.card.node = node;
    this.modalService.open(content, {
      size: 'xl',
      centered: true
    });
  }

  getNode(userId: number, nodeId: number) : Node | undefined {
    return this.nodes.find(node => node.UserId === userId && node.NodeId === nodeId);
  }

  editNode(userId: number, nodeId: number, newNode: INewNode) {
    this.api.Loading = true;
    let node = this.getNode(userId, nodeId);
    if (node !== undefined) {
      node.Update(newNode);
    }
    this.apiSetNode(nodeId, node);
  }

  addNode(newNode: INewNode) {
    this.apiAddNode(newNode);
  }

  deleteNode(userId: number, nodeId: number) {
    this.apiDeleteNode(nodeId);
  }
}
