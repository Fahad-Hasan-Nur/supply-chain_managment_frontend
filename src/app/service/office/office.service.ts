import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OFFICE_API, PRJ_API, TASK_API } from '../../common/constant/api.constants';
import { Employee } from '../../common/model/employee';
import { User } from '../../common/model/user';
import { OfficeBrief } from '../../views/prj-planning/model/officeBrief';
@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private _http: HttpClient) { }

  getOffice(): Observable<OfficeBrief[]>
  {
    return this._http.get<OfficeBrief[]>(OFFICE_API.GET_OFFICES);
  }
  /**
   * get list of sub task by task id
   * @param officeId 
   * @returns list of sub Task
   */

  public getEmployeeByOfficeId(officeId:string):Observable<Employee[]> {
    return this._http.get<Employee[]>(OFFICE_API.GET_EMPLOYEES_BY_OFFICE_ID+officeId+"/employees");
  }

  public getMemberByProjectId(prjId:string):Observable<Employee[]>{
    return this._http.get<Employee[]>(PRJ_API.GET_USERS_BY_PROJECT_ID+prjId+'/members')
  }
  public addOurEmployee(prjId:string, employees: Employee[]){
    return this._http.post(PRJ_API.ADD_MEMBER+prjId+"/members",employees);
  }
  public getEmployeeDetailByEmpId(empId: string){
    return this._http.get(empId);
  }
}
