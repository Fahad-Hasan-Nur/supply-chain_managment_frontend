import { Admin } from './../../common/model/admin';
import { ADMIN_API, LOGIN_API } from './../../common/constant/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH } from '../../common/constant/global-variables.constant';
import { StorageService } from '../../common/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });

  constructor(private _http: HttpClient,
    private storage: StorageService) { }

  public usersStorage(): Admin {
    return this.storage.read(AUTH.CURRENT_USER)
  }
  /**
  * get admin info by admin email
  * @param adminEmail
  * @returns Admin
  */
  public getAdminInfo(email: any): Observable<any> {
    // @ts-ignore

    return this._http.get(ADMIN_API.GET_ADMIN_BY_EMAIL + email, { headers: this.reqHeader });
  }
  /**
  * get admin info by admin id
  * @param id
  * @returns Admin
  */
   public getAdminById(id: any): Observable<any> {
    // @ts-ignore

    return this._http.get(ADMIN_API.GET_ADMIN_BY_ID + id, { headers: this.reqHeader });
  }
  /**
   * Returns list of admins.
   *
   * @returns Admin list
   */
  public getAdmins(): Observable<any> {
    return this._http.get(ADMIN_API.GET_ADMINS, { headers: this.reqHeader });
  }

  /**
   * create a new Admin.
   *
   * @param admin
   * @returns admin
   */
  public addAdmin(admin: Admin) {
    return this._http.post(ADMIN_API.ADD_ADMIN, admin, { headers: this.reqHeader });
  }
  /**
   * create a new Dealer.
   *
   * @param dealer
   * @returns dealer
   */
   public addDealer(admin: Admin): Observable<any>{
    return this._http.post(LOGIN_API.REGISTRATION, admin);
  }
  /**
   * Update a  admin.
   *
   * @param admin
   * @returns admin
   */
  public updateAdmin(admin: Admin) {
    return this._http.put(ADMIN_API.UPDATE_ADMIN, admin, { headers: this.reqHeader });
  }
   /**
   * Returns list of active dealer.
   *
   * @returns Admin list
   */
    public getActiveDealers(): Observable<any> {
      return this._http.get(ADMIN_API.GET_ACTIVE_DEALER, { headers: this.reqHeader });
    }
     /**
   * Returns list of inactive dealer.
   *
   * @returns Admin list
   */
  public getInactiveDealers(): Observable<any> {
    return this._http.get(ADMIN_API.GET_INACTIVE_DEALER, { headers: this.reqHeader });
  }
    /**
   * Returns verify dealer.
   *
   * @returns dealer 
   */
     public verifyDealer(id:string): Observable<any> {
      return this._http.get(ADMIN_API.VERIFY_DEALER+id, { headers: this.reqHeader });
    }
      /**
   * Returns Activated dealer.
   *
   * @returns dealer 
   */
       public activateDealer(token:string): Observable<any> {
        return this._http.get(LOGIN_API.ACTIVATE+token);
      }
      /**
   * Returns  Delete Dealer.
   *
   * @returns Dealer/Admin 
   */
  public rejectDealer(msg:string,admin:Admin): Observable<any> {
    return this._http.post(ADMIN_API.REJECT_DEALER+msg ,admin,{ headers: this.reqHeader });
}
}
