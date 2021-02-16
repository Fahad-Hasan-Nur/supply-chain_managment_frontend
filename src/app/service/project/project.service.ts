import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {OFFICE_API, PRJ_API} from '../../common/constant/api.constants'
import { Layer } from '../../views/overview/model/layer';
import { LayerOfficeBrief } from '../../views/overview/model/layer-office-brief';
import { Project } from '../../views/prj-planning/model/project';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient,private usersService: UsersService) { }

  /**
   * create a new project.
   *
   * @param project
   * @returns project
   */
  public addProject(project:Project){
    return this._http.post(PRJ_API.ADD,project);
  }

  /**
   * update a old project.
   *
   * @param project
   * @returns project
   */
  public updateProject(project: Project): Observable<Project> {
    return this._http.put(PRJ_API.UPDATE, project)
  }

  /**
   * Returns list of projects.
   *
   * @returns Project list
   */
  public getProjects(): Observable<any>{
    return this._http.get(PRJ_API.GET_PROJECTS);
  }

   getPrjOverview(data): Observable<Project> {
    if (data == null) {
      return this._http.get<Project>(PRJ_API.GET_PROJECTS + this.usersService.usersStorage().projectId);
    } else {
      return this._http.get<Project>(PRJ_API.GET_PROJECTS + data);
    }

  }

  /**
   * get list of Ministry .
   *
   */
  getMinistry() : Observable<LayerOfficeBrief[]>
  {
    return this._http.get<LayerOfficeBrief[]>(OFFICE_API.GET_MINISTRIES);
  }
  /**
   * get list of  office by division id .
   *
   */
  getListByDivisionId(data):Observable<LayerOfficeBrief[]> {
    return this._http.get<LayerOfficeBrief[]>(OFFICE_API.GET_DIVISION+data+'/offices');
  }

  getLayers():Observable<Layer[]>{
    return this._http.get<Layer[]>(OFFICE_API.GET_DIVISION);
  }

}
