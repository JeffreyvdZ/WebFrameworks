import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {

  BROWSER_STORAGE_ITEM_NAME;
  RESOURCES_URL;

  currentUser: User = null;
  currentToken: string = "";

  constructor(private http: HttpClient) {
    this.BROWSER_STORAGE_ITEM_NAME = environment.BROWSER_STORAGE_ITEM_NAME;
    this.RESOURCES_URL = environment.BACKEND_URL + "/authentication"
    this.getTokenFromBrowserStorage();
  }

  async asyncSignIn(email: String, password: String): Promise<User> {
    let response0 =
      this.http.post<HttpResponse<User>>(this.RESOURCES_URL + "/login",
        {email: email, password: password},
        {observe: "response"}).pipe(shareReplay(1))

    let response = await response0.toPromise()
      .catch(error => {this.signOut(); return null});

    let user = (response?.body as unknown as User);

    response0.subscribe(data => {
      let token = data['headers'].get('Authorization');

      token = token.replace('Bearer', '');

      this.saveTokenIntoBrowserStorage(token, user);
    })
    return user;
  }

  public signOut(){
    window.sessionStorage.removeItem(this.BROWSER_STORAGE_ITEM_NAME);
    window.localStorage.removeItem(this.BROWSER_STORAGE_ITEM_NAME);
  }

  public saveTokenIntoBrowserStorage(token: string, user: User){
    let values = {'token': token, 'user': user}
    window.sessionStorage.setItem(this.BROWSER_STORAGE_ITEM_NAME, JSON.stringify(values));
    window.localStorage.setItem(this.BROWSER_STORAGE_ITEM_NAME, JSON.stringify(values));
  }

  public getTokenFromBrowserStorage() {
    if(window.sessionStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME) !== null) {
      this.currentToken = JSON.parse(window.sessionStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME)).token;
      this.currentUser = JSON.parse(window.sessionStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME)).user;
    } else {
      this.currentToken = null;
      this.currentUser = null;
    }

    if(window.localStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME) !== null){
      this.currentToken = JSON.parse(window.localStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME)).token;
      this.currentUser = JSON.parse(window.localStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME)).user;
    } else {
      this.currentToken = null;
      this.currentUser = null;
    }
  }

  public isAuthenticated(){
    this.getTokenFromBrowserStorage()
    return this.getCurrentToken() !== null;
  }

  public getCurrentToken(): string{
    this.getTokenFromBrowserStorage()
    return this.currentToken;
  }

  public getCurrentUser(): User {
    this.getTokenFromBrowserStorage()
    return this.currentUser;
  }
}
