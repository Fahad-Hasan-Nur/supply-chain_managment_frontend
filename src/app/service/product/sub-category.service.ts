import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH } from '../../common/constant/global-variables.constant';
import { StorageService } from '../../common/service/storage/storage.service';
import { SUB_CATEGORY_API } from './../../common/constant/api.constants';
import { SubCategory } from './../../common/model/sub-category';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {

constructor(private _http: HttpClient, private storage: StorageService) { }

private  reqHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + this.storage.read(AUTH.TOKEN),
});
   /**
   * Returns list of sub category.
   *
   * @returns Product list
   */
  public getSubCAtegory(): Observable<any> {
    return this._http.get(SUB_CATEGORY_API.GET_SUB_CATEGORIES, { headers: this.reqHeader });
  }

   /**
   * get list of  sub category by category id .
   *
   */
  public getSubCategoryByCategoryId(data): Observable<SubCategory[]> {
    return this._http.get<SubCategory[]>(SUB_CATEGORY_API.GET_SUB_CATEGORY_BY_CATEGORY + data, { headers: this.reqHeader });
  }
  /**
   * create a new sub category.
   *
   * @param subCategory
   * @returns sub category
   */
  public addSubCategory(subCategory: SubCategory) {
    return this._http.post(SUB_CATEGORY_API.ADD_SUB_CATEGORY, subCategory, { headers: this.reqHeader });
  }

   /**
   * Returns single subCategory by id.
   *
   * @returns SubCategory
   */
  public getSubCategoryById(id): Observable<any> {
    return this._http.get<SubCategory>(SUB_CATEGORY_API.GET_SUB_CATEGORY_BY_ID + id, { headers: this.reqHeader });
}
}
