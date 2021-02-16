import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../views/prj-planning/model/task';
import {Project} from "../../views/prj-planning/model/project";
import {Admin} from "../model/admin";
import {rejects} from "assert";
import { Product } from '../model/product';
import { Auth } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentAdminState!: BehaviorSubject<Admin>;
  private currentTaskState!: BehaviorSubject<Task>;
  private currentProductState!: BehaviorSubject<Product>;
  private currentProjectState!: BehaviorSubject<Project>;
  private currentAuthState!: BehaviorSubject<Auth>;

  /**
   *
   * set current admin
   *
   * @param admin
   */
  public async setAdmin(admin: Admin) {
    await new Promise((resolve,rejects) => {
      if (this.currentAdminState === undefined) this.currentAdminState = new BehaviorSubject<Admin>(admin);
    });
    await this.currentAdminState.next(admin);
  }

  /**
   *
   * get current Admin.
   *
   * @return currentAdminState
   */
  public getAdmin(): Admin{
    return this.currentAdminState.value;
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
   * set current product.
   *
   * @param product
   */
  public async setProduct(product: Product) {
    await new Promise((resolve,rejects) => {
      if (this.currentProductState === undefined) this.currentProductState = new BehaviorSubject<Product>(product);
    });
    await this.currentProductState.next(product);
  }
  public async setProject(product: Project) {
    await new Promise((resolve,rejects) => {
      if (this.currentProjectState === undefined) this.currentProjectState = new BehaviorSubject<Project>(product);
    });
    await this.currentProductState.next(product);
  }
  public async setAuth(auth: Auth) {
    await new Promise((resolve,rejects) => {
      if (this.currentAuthState === undefined) this.currentAuthState = new BehaviorSubject<Auth>(auth);
    });
    await this.currentAuthState.next(auth);
  }

  /**
   * get current product.
   *
   * @return currentProductState
   */
  public getProduct(): Product{
    return this.currentProductState.value;
  }
  public getProject(): Product{
    return this.currentProjectState.value;
  }
  public getAuth(): Auth{
    return this.currentAuthState.value;
  }

}
