import { LOGIN_API } from './../common/constant/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {GREETING_SERVICE} from "../common/constant/api.constants";
import { AUTH } from '../common/constant/global-variables.constant';
import { StorageService } from '../common/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestLoginService {

  private  reqHeader= new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });
  constructor(private _http: HttpClient,private storage: StorageService) { }

  public getTestLogin(data) : Observable<any>{
    return this._http.post(LOGIN_API.LOGIN,data);
  }
  public testGreetingService():Observable<any>{
    return this._http.get(GREETING_SERVICE);
  }
}
