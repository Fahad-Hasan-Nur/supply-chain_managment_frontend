import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../views/prj-planning/model/task';
import {Project} from "../../views/prj-planning/model/project";
import {User} from "../model/user";
import {rejects} from "assert";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentUserState!: BehaviorSubject<User>;
  private currentTaskState!: BehaviorSubject<Task>;
  private currentProjectState!: BehaviorSubject<Project>;
  private currentFormState!: BehaviorSubject<boolean>;

  /**
   *
   * set current User
   *
   * @param user
   */
  public async setUser(user: User) {
    await new Promise((resolve,rejects) => {
      if (this.currentUserState === undefined) this.currentUserState = new BehaviorSubject<User>(user);
    });
    await this.currentUserState.next(user);
  }

  /**
   *
   * get current User.
   *
   * @return currentUserState
   */
  public getUser(): User{
    return this.currentUserState.value;
  }

  /**
   *
   * set current Tasks.
   *
   * @param task
   */
  public async setTask(task: Task) {
    await new Promise((resolve,rejects) => {
      if (this.currentTaskState === undefined) this.currentTaskState = new BehaviorSubject<Task>(task);
    });
    await this.currentTaskState.next(task);
  }

  /**
   *
   * get current task.
   *
   * @return currentTaskState
   */
  public getTask(): Task{
    return this.currentTaskState.value;
  }

  /**
   *
   * set current project.
   *
   * @param project
   */
  public async setProject(project: Project) {
    await new Promise((resolve,rejects) => {
      if (this.currentProjectState === undefined) this.currentProjectState = new BehaviorSubject<Project>(project);
    });
    await this.currentProjectState.next(project);
  }

  /**
   * get current project.
   *
   * @return currentProjectState
   */
  public getProject(): Project{
    return this.currentProjectState.value;
  }

  /**
   *
   * set current Form state (view or edit).
   *
   * @param status
   */
  public async setIsView(status: boolean) {
    await new Promise((resolve,rejects) => {
      if (this.currentFormState === undefined) this.currentFormState = new BehaviorSubject<boolean>(status);
    });
    await this.currentFormState.next(status);
  }

  /**
   * get current Form state (view or edit).
   *
   * @return currentFormState
   */
  public getIsView(): boolean{
    return this.currentFormState.value;
  }
}
