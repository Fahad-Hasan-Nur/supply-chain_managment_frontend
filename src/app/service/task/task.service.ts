
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TASK_API} from '../../common/constant/api.constants'
import { TaskBrief } from '../../common/model/taskBrief';
import { Task } from '../../views/prj-planning/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  /**
   * create a new task
   * @param task
   * @returns task
   */
  public addTask(task:any){
    // @ts-ignore
    return this._http.post(TASK_API.ADD,task);
  }

  /**
   * update a old task
   * @param task S
   */
  public updateTask(task:any):Observable<any>{
    // @ts-ignore
    return this._http.put(TASK_API.UPDATE,task);
  }

  /**
   * get tree list of task by project id
   * @param prjId
   * @returns tree list of Task
   */
  public getTasksByPrjId(prjId:string):Observable<Task>{
    console.log(prjId);
    return this._http.get(TASK_API.GET_TASKS_TREE_BY_PRJID+prjId+'/tree');
  }

  /**
   * returns list of task by project id.
   *
   * @param projectId
   * @returns list of Tasks
   */
  public getTaskBriefByPrjId(prjId:string):Observable<TaskBrief[]>{
    console.log(prjId);
    return this._http.get<TaskBrief[]>(TASK_API.GET_TASKS_BY_PRJID+prjId+"/list");
  }
  /**
   * get list of sub task by task id
   * @param taskId
   * @returns list of sub Task
   */
  public getSubTasksByTaskId(taskId:string){
    return this._http.get(TASK_API.GET_SUB_TASKS_BY_TASKID+taskId);
  }

}
