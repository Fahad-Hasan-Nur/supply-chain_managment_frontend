import { Injectable } from "@angular/core";
@Injectable()
export class Transaction {
    public requisitionId?:string;
    public id?: string ;
    public paid?: number ;
    public due?: number ;
    public status?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public userId?: string;
    public accountNumber?: string;
    public paymentMethod?: string;
    public transactionId?: string;
  }
  