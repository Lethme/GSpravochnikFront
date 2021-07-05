export interface IUser {
  user_id: number;
  user_last_date: Date;
  user_login: string;
  user_passwd: string;
  user_reg_date: Date;
}

export class User implements IUser {
  user_id: number = -1;
  user_last_date: Date = new Date();
  user_login: string = '';
  user_passwd: string = '';
  user_reg_date: Date = new Date();

  public get Id(): number { return this.user_id; }
  public get LastVisitDate(): Date { return this.user_last_date; }
  public get UserLogin(): string { return this.user_login }
  public get UserPassword(): string { return this.user_passwd; }
  public get RegisterDate(): Date { return this.user_reg_date; }

  public static async getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>(resolve => {
      fetch('//3.122.244.77/spravochnik/').then(res => res.json()).then(res => {
        let arr: Array<User> = res;
        resolve(res);
      });
    });
  }
}
