import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {GREETING_SERVICE} from "../common/constant/api.constants";

@Injectable({
  providedIn: 'root'
})
export class TestLoginService {

  constructor(private _http: HttpClient) { }

  public getTestLogin() : Observable<any>{
    return this._http.post('http://dev-hscm.grp.gov.bd/global/api/auth-service/auth-service//sec/master/authentication/v1/login',
      {
        "userId": "asad0002",
        "userPassword": "123456789",
        "clientId": "grp-web-portal",
        "clientPassword": "123456",
        "grantType": "password"
      });
  }
  public testGreetingService():Observable<any>{
    return this._http.get(GREETING_SERVICE);
  }
}
