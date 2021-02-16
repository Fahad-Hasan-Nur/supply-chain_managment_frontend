import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatSnackBar, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA } from '@angular/material';
import { addYears } from 'date-fns';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { Task } from '../../../views/prj-planning/model/task';
import { TaskService } from '../../../service/task/task.service';
import { DatePipe } from '@angular/common';
import { MY_FORMATS, PROJECT } from '../../constant/global-variables.constant';
import { StorageService } from '../../service/storage/storage.service';
//import { UsersService } from '../../../service/users/users.service';
import { Employee } from '../../model/employee';
import { TaskBrief } from '../../model/taskBrief';
//import { OfficeService } from '../../../service/office/office.service';
import { ToastService } from '../../service/toast.service';

import { success_message } from '../../constant/messages';
import { LoaderComponent } from '../../../views/prj-planning/loader.component';
import {TreeService} from "../../../views/prj-planning/services/tree/tree.service";
import { UtilService } from '../../service/util.service';
// import { MomentUtcDateAdapter } from '../../service/MomentUtcDateAdapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild(LoaderComponent,{static:false}) loader: LoaderComponent;
  @Input() editable = false;
  @Input() isModal = false;
  @Input() underTab = false;
  @Output() modelOff = new EventEmitter<boolean>(false);
  @Output() afterSave = new EventEmitter<Task>(false);
  @Output() task = new EventEmitter<Task>();
  @Input() taskData: Task;
  checked = false;
  employees: Employee[];
  tasks: TaskBrief[];
  taskId: string;
  empId:string;
  employeeId: FormControl = new FormControl();
  parentTaskId: FormControl = new FormControl();
  filteredOptionsEmployee: Observable<Employee[]>;
  filteredOptionsTask: Observable<TaskBrief[]>;
  minDate = new Date();
  maxDate = addYears(new Date(), 1);
  myForm: FormGroup;
  isParent: boolean;
  public data: Task;
  constructor(
    public fb: FormBuilder,
    protected snackbar: MatSnackBar,
    public datepipe: DatePipe,
    private storage: StorageService,
    // private userService: UsersService,
    // private officeService: OfficeService,
    private service: TaskService,
    private toastService: ToastService,
    private treeService: TreeService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.reactiveForm();
    this.employeeInitialization();
    // this.officeService.getMemberByProjectId(this.userService.usersStorage().projectId).subscribe(res=>{
    //   console.log(res);
    //   this.employees = res;
    // });
    // if(this.data.parent){
    //  this.taskInitialization();
    //   this.service.getTaskBriefByPrjId(this.userService.usersStorage().projectId).subscribe(res=>{
    //   this.tasks = res;
    //   this.tasks = this.tasks.filter(obj => obj.title.toLowerCase() !== this.data.title.toLowerCase());
    // })
    // }
  }

  employeeInitialization(){
    this.employeeId.setValue({ id: this.data.employeeId, title: this.data.assignee });
    this.filteredOptionsEmployee = this.employeeId.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => this.filterEmloyee(name))
    );
  }
  taskInitialization(){
    this.parentTaskId.setValue({ id: this.data.id, title: this.data.parentTaskTitle });
    this.filteredOptionsTask = this.parentTaskId.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === "string" ? value : value.title)),
      map(val => this.filterTask(val))
    );
  }
  // setParent(){
  //   this.data.parent = !this.data.parent;
  //   if(this.data.parent === true){
  //     this.taskInitialization();
  //     this.service.getTaskBriefByPrjId(this.userService.usersStorage().projectId).subscribe(res=>{
  //       this.tasks = res;
  //       this.treeService.getTreeTaskToChildTasksId(this.data).forEach(taskId =>{
  //         this.tasks.splice(this.tasks.findIndex(x => x.id == taskId), 1);
  //       })
  //     })
  //   }else{
  //     this.parentTaskId.setValue({ id: null, title: null });
  //   }
  // }
  updateForm(ev: any, idd: any, componentid: any) {
    console.log(idd)
    if (ev.isUserInput) {
      if (componentid === 'employeeId') {
        this.empId = idd;
        this.myForm['controls']['employeeId'].setValue(ev.source.value);
      }if (componentid === 'parentTaskId') {
        this.taskId = idd;
        this.myForm['controls']['parentTaskId'].setValue(ev.source.value);
      }
      else {
        console.log('ooops');
      }
    }
  }
  filterEmloyee(val: string): Employee[] {
    if (val) {
      let filterValue = val.toLowerCase();
      console.log('calling employee')
      return this.employees.filter(employee => employee.name.toLowerCase().startsWith(filterValue));
    }
    console.log(this.employees)
    return this.employees;
  }
  filterTask(val: string): TaskBrief[] {
    if (val) {
      let filterValue = val.toLowerCase();
      return this.tasks.filter(task => task.title.toLowerCase().startsWith(filterValue));
    }
    return this.tasks;
  }

  displayWith(value: any): string {
    return typeof value === 'string' ? value : (value == null ? '' : value.title);
  }
  cancel() {
    if(this.isModal){
       this.modelOff.emit(true)
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return true;
  };
  reactiveForm() {
    this.data=this.taskData ? this.taskData: new Task();
    this.myForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      parent: [this.data.parent],
      economyCode: [this.data.economyCode, []],
      employeeId: [this.data.employeeId, []],
      category: [this.data.category, []],
      startDate: [this.data.startDate, [Validators.required]],
      endDate: [this.data.endDate, [Validators.required]],
      parentTaskId : [this.data.parentTaskId, []]
    });
  }
  updatedVal(value){
    this.myForm.markAsDirty()
  }
  save(){
    this.loadDataForm();
    this.service.addTask(this.data).subscribe(res => {
   //   this.projectOfTasks();

      this.toastService.openSnackBar(success_message.SAVED_SUCCESSFULLY,this.toastService.ACTION_SUCESS,this.toastService.CLASS_NAME_SUCESS)
      this.myForm.reset();
    },
    error => {
     console.log(error);
     this.toastService.openSnackBar(success_message.FAILD,this.toastService.ACTION_WRONG,this.toastService.CLASS_NAME_WRONG)
    });
  }
  loadDataForm(){
    // this.loader.loading = true;
    // let userInfo = this.userService.usersStorage();
    // this.data.projectId = userInfo.projectId;
    // this.data.title = this.myForm.controls['title'].value;
    // this.data.employeeId = this.empId;
    // this.data.startDate = this.myForm.controls['startDate'].value;
    // this.data.endDate = this.myForm.controls['endDate'].value;
    // this.data.economyCode = this.myForm.controls['economyCode'].value;
    // this.data.category = this.myForm.controls['category'].value;
    // this.data.parentTaskId = this.taskId;
    // this.data.startDate = this.utilService.convertDateTimeToDate(this.data.startDate.toString());
    // this.data.endDate = this.utilService.convertDateTimeToDate(this.data.endDate.toString());
    // console.log(this.data)
  }
  update(){
    this.loadDataForm();
    this.service.updateTask(this.data).subscribe(res=>{
     // this.projectOfTasks();
      this.toastService.openSnackBar(success_message.SAVED_SUCCESSFULLY,this.toastService.ACTION_SUCESS,this.toastService.CLASS_NAME_SUCESS)
    },error=>{
      this.loader.loading=false;
      this.toastService.openSnackBar(success_message.FAILD,this.toastService.ACTION_WRONG,this.toastService.CLASS_NAME_WRONG)
    })
  }

//  private projectOfTasks(){
//     this.service.getTasksByPrjId(this.userService.usersStorage().projectId).subscribe(
//       res => {
//         this.storage.remove(PROJECT.PROJECT_OF_TASKS);
//         this.storage.save(PROJECT.PROJECT_OF_TASKS,res);
//         console.log(this.storage.read(PROJECT.PROJECT_OF_TASKS));
//         this.loader.loading = false;
//         if(!this.editable){
//           this.afterSave.emit(this.data)
//         }else{
//           this.afterSave.emit();
//         }
//       },error => {
//         console.log(error);
//         this.loader.loading = false;
//       }
//     )
//   }

}
