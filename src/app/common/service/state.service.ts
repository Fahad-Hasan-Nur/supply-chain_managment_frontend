import { Requisition } from './../model/requisition';
import { Brand } from './../model/brand';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../views/prj-planning/model/task';
import {Project} from "../../views/prj-planning/model/project";
import {Admin} from "../model/admin";
import {rejects} from "assert";
import { Product } from '../model/product';
import { Auth } from '../model/auth';
import { Category } from '../model/Category';
import { SubCategory } from '../model/sub-category';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentAdminState!: BehaviorSubject<Admin>;
  private currentTransactionState!: BehaviorSubject<Transaction>;
  private currentRequisitionState!: BehaviorSubject<Requisition>;
  private currentCategoryState!: BehaviorSubject<Category>;
  private currentSubCategoryState!: BehaviorSubject<SubCategory>;
  private currentBrandState!: BehaviorSubject<Brand>;
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
   * set current Transaction
   *
   * @param Transaction
   */
    public async setTransaction(transaction: Transaction) {
      await new Promise((resolve,rejects) => {
        if (this.currentTransactionState === undefined) this.currentTransactionState = new BehaviorSubject<Transaction>(transaction);
      });
      await this.currentTransactionState.next(transaction);
    }
   /**
   *
   * set current Requisition
   *
   * @param Requisition
   */
    public async setRequisition(requisition: Requisition) {
      await new Promise((resolve,rejects) => {
        if (this.currentRequisitionState === undefined) this.currentRequisitionState = new BehaviorSubject<Requisition>(requisition);
      });
      await this.currentRequisitionState.next(requisition);
    }
    /**
   *
   * set current brand
   *
   * @param brand
   */
  public async setBrand(brand: Brand) {
    await new Promise((resolve,rejects) => {
      if (this.currentBrandState === undefined) this.currentBrandState = new BehaviorSubject<Brand>(brand);
    });
    await this.currentBrandState.next(brand);
  }
    /**
   *
   * set current category
   *
   * @param category
   */
  public async setCategory(category: Category) {
    await new Promise((resolve,rejects) => {
      if (this.currentCategoryState === undefined) this.currentCategoryState = new BehaviorSubject<Category>(category);
    });
    await this.currentCategoryState.next(category);
  }
    /**
   *
   * set current sub category
   *
   * @param sub_category
   */
  public async setSubCategory(subCategory: SubCategory) {
    await new Promise((resolve,rejects) => {
      if (this.currentSubCategoryState === undefined) this.currentSubCategoryState = new BehaviorSubject<SubCategory>(subCategory);
    });
    await this.currentSubCategoryState.next(subCategory);
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
   * get current Transaction.
   *
   * @return currentTransactionState
   */
   public getTransaction(): Transaction{
    return this.currentTransactionState.value;
  }
   /**
   *
   * get current Brand.
   *
   * @return currentBrandState
   */
  public getBrand(): Brand{
    return this.currentBrandState.value;
  }
   /**
   *
   * get current Category.
   *
   * @return currentCategoryState
   */
  public getCategory(): Category{
    return this.currentCategoryState.value;
  }
   /**
   *
   * get current SubCategory.
   *
   * @return currentSubCategoryState
   */
  public getSubCategory(): SubCategory{
    return this.currentSubCategoryState.value;
  }
    /**
   *
   * get current Requisition.
   *
   * @return currentRequisitionState
   */
     public getRequisition(): Requisition{
      return this.currentRequisitionState.value;
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
