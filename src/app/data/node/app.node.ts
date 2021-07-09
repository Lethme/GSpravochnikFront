export interface INode {
  user_id: number;
  node_id: number;
  node_name: string;
  node_last_name: string;
  node_patronymic: string;
  node_company: string;
  node_phone: string;
  node_email: string;
  node_create_date: Date;
  node_update_date: Date;
  is_public: boolean;
}

export interface INewNode {
  lastName: string,
  name: string,
  patronymic: string,
  company: string,
  phone: string,
  email: string
}

export class Node implements INode {
  user_id: number = -1;
  node_id: number = -1;
  node_name: string = '';
  node_last_name: string = '';
  node_patronymic: string = '';
  node_company: string = '';
  node_phone: string = '';
  node_email: string = '';
  node_create_date: Date = new Date();
  node_update_date: Date = new Date();
  is_public: boolean = false;

  constructor(
    userId: number,
    nodeId: number,
    name: string,
    lastName: string,
    patronymic: string,
    company: string,
    phone: string,
    email: string,
    creationDate: Date,
    lastUpdateDate: Date,
    isPublic: boolean
  ) {
    this.user_id = userId;
    this.node_id = nodeId;
    this.node_name = name;
    this.node_last_name = lastName;
    this.node_patronymic = patronymic;
    this.node_company = company;
    this.node_phone = phone;
    this.node_email = email;
    this.node_create_date = creationDate;
    this.node_update_date = lastUpdateDate;
    this.is_public = isPublic;
  }

  public get UserId(): number { return this.user_id; }
  public get NodeId(): number { return this.node_id; }
  public get Name(): string { return this.node_name; }
  public get LastName(): string { return this.node_last_name; }
  public get Patronymic(): string { return this.node_patronymic; }
  public get Company(): string { return this.node_company; }
  public get Phone(): string { return this.node_phone; }
  public get Email(): string { return this.node_email; }
  public get Public(): boolean { return this.is_public; }
  public get CreationDate(): Date { return this.node_create_date; }
  public get LastUpdateDate(): Date { return this.node_update_date; }

  public set Name(name: string) { this.node_name = name; }
  public set LastName(lastName: string) { this.node_last_name = lastName; }
  public set Patronymic(patronymic: string) { this.node_patronymic = patronymic; }
  public set Company(company: string) { this.node_company = company; }
  public set Phone(phone: string) { this.node_phone = phone; }
  public set Email(email: string) { this.node_email = email; }
  public set LastUpdateDate(date: Date) { this.node_update_date = date; }

  public Update(newNode: INewNode) {
    this.LastName = newNode.lastName;
    this.Name = newNode.name;
    this.Patronymic = newNode.patronymic;
    this.Company = newNode.company;
    this.Phone = newNode.phone;
    this.Email = newNode.email;
  }

  public static Create(node: INode) {
    return new Node(
      node.user_id,
      node.node_id,
      node.node_name,
      node.node_last_name,
      node.node_patronymic,
      node.node_company,
      node.node_phone,
      node.node_email,
      node.node_create_date,
      node.node_update_date,
      node.is_public
    );
  }

  public static CreateEmpty() {
    return new Node(-1, -1, '', '', '', '', '', '', new Date(Date.now()), new Date(Date.now()), false);
  }
}
