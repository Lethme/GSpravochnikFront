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

  // public static async authorizeUser(login: string, password: string) {
  //   return new Promise(resolve => {
  //     fetch('http://52.28.238.133/api/1.1/auth', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //       body: JSON.stringify({
  //         userLogin: login,
  //         userPassword: password
  //       })
  //      }).then(res => res.json()).then(res => {
  //       console.log(res);
  //      })
  //   });
  // }

  // public static async registerUser(login: string, password: string) {
  //   return new Promise(resolve => {
  //     fetch('http://52.28.238.133/api/1.1/registry ', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //       body: JSON.stringify({
  //         userLogin: login,
  //         userPassword: password
  //       })
  //      }).then(res => res.json()).then(res => {
  //       console.log(res);
  //      })
  //   });
  // }
}
