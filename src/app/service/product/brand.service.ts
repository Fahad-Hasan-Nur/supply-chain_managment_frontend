import { BRAND_API } from './../../common/constant/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../common/service/storage/storage.service';
import { AUTH } from '../../common/constant/global-variables.constant';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

constructor(private _http: HttpClient,private storage: StorageService) { }

private  reqHeader= new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
});
   /**
   * Returns list of products.
   *
   * @returns Product list
   */
  public getBrand(): Observable<any>{
    return this._http.get(BRAND_API.GET_BRAND,{ headers: this.reqHeader });
  }
}
