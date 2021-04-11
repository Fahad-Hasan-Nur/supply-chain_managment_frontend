import { Injectable } from "@angular/core";
@Injectable()
export class Requisition {
    public id?: string ;
    public totalCost?: number;
    public status?: string;
    public createdBy?: string;
    public createdAt?: Date;
    public updatedBy?: string;
    public userId?: string;
  }
  