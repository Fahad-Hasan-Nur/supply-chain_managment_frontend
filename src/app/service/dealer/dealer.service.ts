import { Transaction } from './../../common/model/transaction';
import { TRANSACTON_API, REQUISITION_API, ADMIN_API } from './../../common/constant/api.constants';
import { StorageService } from '../../common/service/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH } from '../../common/constant/global-variables.constant';
import { Requisition } from '../../common/model/requisition';
import { VerifiedDealerInfo } from '../../common/model/verified-dealer-info';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
 private  reqHeader= new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });

  constructor(private _http: HttpClient,
    private storage: StorageService) { }

  /**
   * create a new Requisition.
   *
   * @param Requisition
   * @returns Requisition
   */
  public addRequisition(requisition:Requisition){
    return this._http.post(REQUISITION_API.ADD_REQUISITION,requisition,{ headers: this.reqHeader });
  }
  /**
   * create a new Transaction.
   *
   * @param Transaction
   * @returns Transaction
   */
   public addTransaction(transaction:Transaction){
    return this._http.post(TRANSACTON_API.ADD_TRANSACTON,transaction,{ headers: this.reqHeader });
  }
   /**
   * Update a  Requisition.
   *
   * @param Requisition
   * @returns Requisition
   */
    public updateRequisition(requisition:Requisition){
      return this._http.put(REQUISITION_API.UPDATE_REQUISITION,requisition,{ headers: this.reqHeader });
    }
    /**
   * Returns  On cart Requisitions.
   *
   * @returns Requisition 
   */
  public getOnCartRequisition(id:string): Observable<any> {
      return this._http.get<Requisition>(REQUISITION_API.GET_ON_CART_REQUISITION+id ,{ headers: this.reqHeader });
}
   /**
   * Returns  User Transactions.
   *
   * @returns Transaction 
   */
    public getTransactionByUser(id:string): Observable<any> {
      return this._http.get<Transaction>(TRANSACTON_API.GET_TRANSACTON_BY_USER+id ,{ headers: this.reqHeader });
}
   /**
   * Returns  User Transactions.
   *
   * @returns Transaction 
   */
    public getRequisitionById(id:string): Observable<any> {
      return this._http.get<Requisition>(REQUISITION_API.GET_REQUISITION_BY_ID+id ,{ headers: this.reqHeader });
}
 /**
   * Returns   Requisition by Status.
   *
   * @returns Requisition 
   */
  public getRequisitionByStatus(status:string): Observable<any> {
    return this._http.get<Requisition>(REQUISITION_API.GET_REQUISITION_BY_STATUS+status ,{ headers: this.reqHeader });
}
 /**
   * Returns  Delete Requisition.
   *
   * @returns Requisition 
   */
  public deleteRequisitionById(id:string): Observable<any> {
    return this._http.delete(REQUISITION_API.DELETE_REQUISITION+id ,{ headers: this.reqHeader });
}
/**
   * Returns  Delete Requisition.
   *
   * @returns Requisition 
   */
 public deleteTransactionById(id:string): Observable<any> {
  return this._http.delete(TRANSACTON_API.DELETE_TRANSACTON+id ,{ headers: this.reqHeader });
}
 /**
   * Returns  User Transactions.
   *
   * @returns Transaction 
   */
  public getTransactionByRequisitionId(id:string): Observable<any> {
    return this._http.get<Transaction>(TRANSACTON_API.GET_TRANSACTON_BY_REQUISITION+id ,{ headers: this.reqHeader });
}
  /**
   * Returns processed transaction.
   *
   * @returns transaction 
   */
   public processTransaction(id:string): Observable<any> {
    return this._http.get(TRANSACTON_API.PROCESS_TRANSACTION+id, { headers: this.reqHeader });
  }
    /**
   * Returns complete requisition
   *
   * @returns requisition 
   */
     public completeRequisition(id:string): Observable<any> {
      return this._http.get(REQUISITION_API.COMPLETE_REQUISITION+id, { headers: this.reqHeader });
    }
    /**
   * Returns processed requisition.
   *
   * @returns requisition 
   */
   public processRequisition(id:string): Observable<any> {
    return this._http.get(REQUISITION_API.PROCESS_REQUISITION+id, { headers: this.reqHeader });
  }
  /**
   * Returns verify requisition.
   *
   * @returns requisition 
   */
   public verifyRequisition(id:string): Observable<any> {
    return this._http.get(REQUISITION_API.VERIFY_REQUISITION+id, { headers: this.reqHeader });
  }
    /**
   * Returns complete transaction
   *
   * @returns transaction 
   */
     public completeTransaction(id:string): Observable<any> {
      return this._http.get(TRANSACTON_API.COMPLETE_TRANSACTION+id, { headers: this.reqHeader });
    }
    /**
   * Returns   transaction by Status.
   *
   * @returns transaction 
   */
  public getTransactionByStatus(status:string): Observable<any> {
    return this._http.get<Transaction>(TRANSACTON_API.GET_TRANSACTON_BY_STATUS+status ,{ headers: this.reqHeader });
}
/**
   * Returns   transaction by Status.
   *
   * @returns transaction 
   */
 public getVerifiedDealerInfo(): Observable<any> {
  return this._http.get<VerifiedDealerInfo>(ADMIN_API.GET_VERIFIED_DEALER_INFO ,{ headers: this.reqHeader });
}
/**
   * create a new VerifiedDealerInfo.
   *
   * @param VerifiedDealerInfo
   * @returns VerifiedDealerInfo
   */
 public addVerifiedDealerInfo(ob: VerifiedDealerInfo) {
  return this._http.post(ADMIN_API.ADD_VERIFIED_DEALER_INFO, ob, { headers: this.reqHeader });
}

}
