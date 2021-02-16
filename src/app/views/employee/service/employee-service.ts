import { HttpClient } from "@angular/common/http";
import { Employee } from "../model/employee";

export class EmployeeService {
    isValid(dto: Employee[]) {
       // throw new Error("Method not implemented.");
    }
    protected constructor(public http: HttpClient) {
       
      }
    
}