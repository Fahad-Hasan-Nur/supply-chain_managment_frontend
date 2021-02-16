import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
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
    return this._http.post('https://nur-ecommerce-backend.herokuapp.com/api/auth/admin/login',data,{ headers: this.reqHeader } );
  }
  public testGreetingService():Observable<any>{
    return this._http.get(GREETING_SERVICE);
  }
}
