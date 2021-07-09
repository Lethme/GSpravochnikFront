import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState, CurrentState } from 'src/app/app.component';
import { INode, Node } from '../node/app.node';

@Injectable({
    providedIn: 'root'
})
export class API {
    public readonly UserTokenCookie: string = 'authToken';
    public readonly UserLoginCookie: string = 'authLogin';
    public readonly UserIdCookie: string = 'authUserId';

    public readonly StorageSizeDropDownItem: string = 'sizeDropDownItem';
    public readonly StoragePageIndex: string = 'pageIndex';

    constructor(public client: HttpClient, public cookie: CookieService) {  }

    static register: boolean = false;
    static loading: boolean = false;
    static storage: Storage = window.localStorage;

    public Host: string = 'http://52.28.238.133';
    public Path: string = 'api/1.1';
    
    public get AuthHeader(): HttpHeaders { 
        return new HttpHeaders({
             'Authorization': 'Bearer ' + this.UserToken 
        });
    }

    public get Register(): boolean { return API.register; }
    public set Register(state: boolean) { API.register = state; }
    registerSwitch() { API.register = !API.register; }

    public get Loading(): boolean { return API.loading; }
    public set Loading(state: boolean) { API.loading = state; }
    loadingSwitch() { API.loading = !API.loading; }

    public saveData(dataName: string, dataValue: any) {
        API.storage.setItem(dataName + ':' + this.UserId, JSON.stringify(dataValue));
    }

    public getData<T>(dataName: string): T | undefined {
        let data = API.storage.getItem(dataName + ':' + this.UserId);
        if (data === null) return undefined;
        let TData: T = JSON.parse(data);
        return TData;
    }

    public get SizeDropDownItem(): number {
        let item: number | undefined = this.getData<number>(this.StorageSizeDropDownItem);
        if (item === undefined) return 0;
        return item;
    }
    public set SizeDropDownItem(selectedItem: number) { this.saveData(this.StorageSizeDropDownItem, selectedItem); }

    public get PageIndex(): number {
        let size: number | undefined = this.getData<number>(this.StoragePageIndex);
        if (size === undefined) return 1;
        if (size < 1) return 1;
        return size;
    }
    public set PageIndex(pageSize: number) { this.saveData(this.StoragePageIndex, pageSize); }

    public get UserToken(): string { return this.cookie.get(this.UserTokenCookie); }
    public get UserLogin(): string { return this.cookie.get(this.UserLoginCookie); }
    public get UserId(): string { return this.cookie.get(this.UserIdCookie); }
    public get Authorized(): boolean { return this.UserToken !== ''; }

    public getUrl(path: string, options: {} = {}): string {
        let keysArr = Object.keys(options);
        let valuesArr = Object.values(options);
        let arr = [];
        for (let i = 0; i < keysArr.length; i++) {
            arr.push({ key: keysArr[i], value: valuesArr[i] })
        }
        let url = this.Host + '/' + this.Path + '/' + path;
        if (arr.length !== 0) {
            url += '?'
            arr.forEach((obj, index) => {
                if (index !== arr.length - 1) {
                    url += obj.key + '=' + obj.value + '&';
                } else {
                    url += obj.key + '=' + obj.value;
                }
            })
        }

        return url;
    }

    public logout() {
        this.clearAuthCookie();
        this.reload();
    }

    public reload(showLoader: boolean = true) {
        if (showLoader) this.Loading = true;
        location.reload();
    }

    private clearAuthCookie() { 
        this.cookie.delete(this.UserTokenCookie);
        this.cookie.delete(this.UserLoginCookie);
        this.cookie.delete(this.UserIdCookie);
     }

    private setCookie(userToken: string, userLogin: string, userId: number | string, expiresIn: number) {
        let expireDate: Date = new Date(Date.now() + Math.round(expiresIn));
        this.cookie.set(this.UserTokenCookie, userToken, expireDate);
        this.cookie.set(this.UserLoginCookie, userLogin, expireDate);
        this.cookie.set(this.UserIdCookie, userId.toString(), expireDate);
    }

    public authorizeUser(login: string, pass: string) {
        this.Loading = true;
        this.client.post<any>(this.getUrl('auth'), JSON.stringify({
            userLogin: login,
            userPassword: pass
        })).subscribe(data => {
            let token: string = data.data[0].token;
            let userId: number = data.data[0].userId;
            let expiresIn: number = Date.parse(data.data[0].expiresIn) - Date.now();
            this.setCookie(token, login, userId, expiresIn);
            CurrentState.state = AppState.App;
            this.Loading = false;
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
            this.Loading = false;
        });
    }

    public registerUser(login: string, pass: string, repass: string) {
        this.Loading = true;
        if (pass === repass) {
            this.client.post<HttpResponseBase>(this.getUrl('registry'), JSON.stringify({
              userLogin: login,
              userPassword: pass
            })).subscribe(data => {
                alert('User ' + login + ' successfully created!');
                this.registerSwitch();
                this.Loading = false;
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
                this.Loading = false;
            });
        } else {
            alert('Password mismatch');
        }
    }
}