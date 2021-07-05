export interface INode {
  user_id: number;
  node_id: number;
  node_name: string;
  node_last_name: string;
  node_patronymic: string;
  node_company: string;
  node_phone: string;
  node_create_date: Date;
  node_update_date: Date;
}

export class Node implements INode {
  user_id: number = -1;
  node_id: number = -1;
  node_name: string = '';
  node_last_name: string = '';
  node_patronymic: string = '';
  node_company: string = '';
  node_phone: string = '';
  node_create_date: Date = new Date();
  node_update_date: Date = new Date();

  constructor(
    userId: number,
    nodeId: number,
    name: string,
    lastName: string,
    patronymic: string,
    company: string,
    phone: string,
    creationDate: Date,
    lastUpdateDate: Date
  ) {
    this.user_id = userId;
    this.node_id = nodeId;
    this.node_name = name;
    this.node_last_name = lastName;
    this.node_patronymic = patronymic;
    this.node_company = company;
    this.node_phone = phone;
    this.node_create_date = creationDate;
    this.node_update_date = lastUpdateDate;
  }

  public get UserId(): number { return this.user_id; }
  public get NodeId(): number { return this.node_id; }
  public get Name(): string { return this.node_name; }
  public get LastName(): string { return this.node_last_name; }
  public get Patronymic(): string { return this.node_patronymic; }
  public get Company(): string { return this.node_company; }
  public get Phone(): string { return this.node_phone; }
  public get CreationDate(): Date { return this.node_create_date; }
  public get LastUpdateDate(): Date { return this.node_update_date; }

  public set Name(name: string) { this.node_name = name; }
  public set LastName(lastName: string) { this.node_last_name = lastName; }
  public set Patronymic(patronymic: string) { this.node_patronymic = patronymic; }
  public set Company(company: string) { this.node_company = company; }
  public set Phone(phone: string) { this.node_phone = phone; }
  public set LastUpdateDate(date: Date) { this.node_update_date = date; }

  public static Create(
    userId: number,
    nodeId: number,
    name: string,
    lastName: string,
    patronymic: string,
    company: string,
    phone: string,
    creationDate: Date,
    lastUpdateDate: Date
  ) : Node {
    return new Node(userId, nodeId, name, lastName, patronymic, company, phone, creationDate, lastUpdateDate);
  }
}
