import { Injectable } from "@angular/core";
@Injectable()
export class RequisitionProduct {
    public id?: string ;
    public totalCost?: number;
    public createdBy?: string;
    public updatedBy?: string;
    public productId?: string;
    public productName?: string;
    public requisitionId?: string;
    public variationId?: string;
    public variationName?: string;
    public cartoonSize?: number;
    public cartoonPerLot?: number;

}
  