import { Brand } from './../../common/model/brand';
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
  /**
   * create a new brand.
   *
   * @param brand
   * @returns brand
   */
  public addBrand(brand:Brand){
    return this._http.post(BRAND_API.ADD_BRAND,brand,{ headers: this.reqHeader });
  }
   /**
   * Returns single brand by id.
   *
   * @returns Brand 
   */
  public getBrandById(id): Observable<any> {
    return this._http.get<Brand>(BRAND_API.GET_BRAND_BY_ID + id,{ headers: this.reqHeader });
}
 /**
   * Update a  brand.
   *
   * @param brand
   * @returns brand
   */
  public updateBrand(brand:Brand){
    return this._http.put(BRAND_API.UPDATE_BRAND,brand,{ headers: this.reqHeader });
  }
}
