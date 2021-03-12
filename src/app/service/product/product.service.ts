import { Product } from './../../common/model/product';
import { StorageService } from './../../common/service/storage/storage.service';
import { PRODUCT_API } from './../../common/constant/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH } from '../../common/constant/global-variables.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private  reqHeader= new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });

  constructor(private _http: HttpClient,
    private storage: StorageService) { }

  /**
   * create a new project.
   *
   * @param product
   * @returns product
   */
  public addProduct(product:Product){
    return this._http.post(PRODUCT_API.ADD_PRODUCT,product,{ headers: this.reqHeader });
  }
  /**
   * Update a  product.
   *
   * @param product
   * @returns product
   */
  public updateProduct(product:Product){
    return this._http.put(PRODUCT_API.UPDATE_PRODUCT,product,{ headers: this.reqHeader });
  }
    /**
   * Returns list of products.
   *
   * @returns Product list
   */
  public getProducts(): Observable<any>{
    return this._http.get(PRODUCT_API.GET_PRODUCTS,{ headers: this.reqHeader });
  }

  /**
   * Returns single product by id.
   *
   * @returns Product 
   */
  public getProductById(id): Observable<any> {
      return this._http.get<Product>(PRODUCT_API.GET_PRODUCT_BY_ID + id,{ headers: this.reqHeader });
}
/**
   * get list of  product by sub category id .
   *
   */
 public getProductBySubCategoryId(data): Observable<Product[]> {
  return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_SUB_CATEGORY_ID + data, { headers: this.reqHeader });
}
}
