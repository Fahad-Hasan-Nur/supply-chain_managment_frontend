import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS_API } from '../../common/constant/api.constants';
import { AUTH } from '../../common/constant/global-variables.constant';
import { User } from '../../common/model/user';
import { StorageService } from '../../common/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient,
             private storage: StorageService) { }


  public usersStorage(): User{
    return this.storage.read(AUTH.CURRENT_USER)
  }
  /**
   * get user info by userid
   * @param userId
   * @returns User
   */
  public getUserInfo(userId:any):Observable<any>{
    // @ts-ignore
     return this._http.get(USERS_API.GET_USERS_BY_USER_ID+userId);
  }
}
