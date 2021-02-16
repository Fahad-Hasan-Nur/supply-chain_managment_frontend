import { ADMIN_API } from './../../common/constant/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH } from '../../common/constant/global-variables.constant';
import { Admin } from '../../common/model/admin';
import { StorageService } from '../../common/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient,
    private storage: StorageService) { }
    private  reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
    });
public usersStorage(): Admin{
return this.storage.read(AUTH.CURRENT_USER)
}
/**
* get admin info by admin email
* @param adminEmail
* @returns Admin
*/
public getAdminInfo(email:any):Observable<any>{
// @ts-ignore

return this._http.get(ADMIN_API.GET_ADMIN_BY_EMAIL+email,{ headers: this.reqHeader });
}
}
