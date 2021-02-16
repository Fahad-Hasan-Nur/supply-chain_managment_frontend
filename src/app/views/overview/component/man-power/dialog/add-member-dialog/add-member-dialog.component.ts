import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../../../common/constant/editor.constants';
import { Employee } from '../../../../../../common/model/employee';
import { Member } from '../../../../model/member';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersService } from '../../../../../../service/users/users.service';
import { OfficeService } from '../../../../../../service/office/office.service';
import { LoaderComponent } from '../../../loader/loader.component';
import { ToastService } from '../../../../../../common/service/toast.service';
import { success_message } from '../../../../../../common/constant/messages';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {

  public toolbarOptions;
  myFormGroup : FormGroup;
  employees: Employee[] = [];
  selectedEmployeeId: Array<string> = [];
  ourEmployee:Employee[]=[];
  displayedColumns: string[] = ['checkBox','name','post'];
  dataSource:MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);
  @ViewChild(LoaderComponent,{static:false}) loader: LoaderComponent;
  modalData: Employee[];

  public officeId = this.userService.usersStorage().officeOid;
  public projectId = this.userService.usersStorage().projectId;
  constructor( public fb: FormBuilder,
     public dialog: MatDialog,
     public dialogRef: MatDialogRef<AddMemberDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
     private toastService: ToastService,
     private userService: UsersService,
     private officeService: OfficeService) {
}

  ngOnInit() {
    this.modalData = this.data;
    this.dataSource = new MatTableDataSource<Employee>();
  }
  employee: Employee;
  ngAfterViewInit(){
    this.loader.loading = true;
    this.reactiveForm();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
    this.officeService.getEmployeeByOfficeId(this.officeId).subscribe(res=>{
        // this.dataSource.data = this.employees;
        // for(let employee of res) {
        //   this.employee = new Employee();
        //   this.employee.id = employee.id;
        //   this.employee.name = employee.name;
        //   this.employee.officeUnitPostName = employee.officeUnitPostName;
        //   this.employees.push(this.employee)
        // }
        this.employees = res;
        // console.log(this.employees)
        let myUser = this.modalData.map(item => { return item.name; });
        this.employees = this.employees.filter(x=> !myUser.includes(x.name))
        this.loader.loading = false;
        this.dataSource.data = this.employees;
    })
  }
  reactiveForm() {
    this.data= new Member();
    this.myFormGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
      office: [this.data.office, [Validators.required]],
      branch: [this.data.branch, [Validators.required]],
      post: [this.data.post, [Validators.required]],
      role: [this.data.role, [Validators.required]],
    });
  }
  masterToggle() {
    this.isAllSelected() ?
      this.makeAllUnSelected() :
      this.makeAllSelected();
  }
  isAllSelected() {
    return this.dataSource.data.length === this.selectedEmployeeId.length;
  }

  makeAllUnSelected() {
    this.selection.clear();
    this.dataSource.data.forEach(row => this.selection.deselect(row));
    this.selectedEmployeeId = [];
    this.ourEmployee=[]
    console.log(this.selectedEmployeeId)
  }

  makeAllSelected() {
    this.selectedEmployeeId = [];
    this.employees.forEach(x => {
        this.selectedEmployeeId.push(x.id);
        this.ourEmployee.push(x);
        this.selection.select(x);
    });
    // console.log(this.selectedEmployeeId)
    // console.log(this.ourEmployee)
  }
  changeSelection(row) {
    console.log(row)
    if (this.selection.isSelected(row)) {
      this.selectedEmployeeId.forEach( x => {
        if (x === row.id) {
          console.log("delete")
          this.selectedEmployeeId.splice(this.selectedEmployeeId.indexOf(x), 1);
        }
      });
      this.ourEmployee.forEach(s=>{
        this.ourEmployee.splice(this.ourEmployee.indexOf(s),1);
      })
      this.selection.deselect(row);
    } else {
      console.log("insert")
      this.selectedEmployeeId.push(row.id);
      this.ourEmployee.push(row)
      this.selection.select(row);
    }
  }

  isInitiallySelected(row) {
    if (this.selectedEmployeeId.includes(row.id)) {
      this.selection.select(row);
      return this.selectedEmployeeId.includes(row.id);
    }
  }
  isCheckedDisabled(employee: Employee): boolean {
    return employee.id === this.userService.usersStorage().employeeId;
  }
  save(){
     this.loader.loading = true;
     this.officeService.addOurEmployee(this.projectId, this.ourEmployee).subscribe(res=>{
      this.toastService.openSnackBar(success_message.SAVED_SUCCESSFULLY,this.toastService.ACTION_SUCESS,this.toastService.CLASS_NAME_SUCESS)
      this.loader.loading = false;
      this.dialog.closeAll();
     },error => {
      console.log(error);
      this.loader.loading = false;
      this.toastService.openSnackBar(success_message.FAILD,this.toastService.ACTION_WRONG,this.toastService.CLASS_NAME_WRONG)
     });
  }
  cancel(){
      this.dialog.closeAll();
  }
}



