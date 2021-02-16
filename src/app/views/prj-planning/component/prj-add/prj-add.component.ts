import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { success_message } from '../../../../common/constant/messages';
import { FilterService } from '../../../../common/service/filter.service';
import { ToastService } from '../../../../common/service/toast.service';
import { OfficeService } from '../../../../service/office/office.service';
import { ProjectService } from '../../../../service/project/project.service';
import { LoaderComponent } from '../../loader.component';
import { OfficeBrief } from '../../model/officeBrief';
import { OfficeEmployee } from '../../model/officeEmployee';
import { Project } from '../../model/project';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-prj-add',
  templateUrl: './prj-add.component.html',
  styleUrls: ['./prj-add.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PrjAddComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;
  private subsOf = new Subscription();
  public office: OfficeBrief[] = [];
  public filteredOffice: Observable<any[]>;
  public officeControl = new FormControl();
  private subs = new Subscription();
  public employee: OfficeEmployee[] = [];
  public filteredEmployees: Observable<any[]>;
  public employeeControl = new FormControl();
  public myForm: FormGroup;
  public myFilter: any;
  public maxDate: any;
  public minDate: any;
  public data: Project;
  constructor(public fb: FormBuilder,
              private officeService: OfficeService,
              private service: ProjectService,
              private toastService: ToastService,
              private filterService: FilterService,
    ) {
  }
  ngOnInit() {
    this.subsOf.add(this.officeService.getOffice().subscribe((data) => {
      this.office = data;
      this.filteredOffice = this.filterService.filterData(this.officeControl, this.office, true);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      }));

    this.reactiveForm();
    this.myForm = new FormGroup({
      projectName: new FormControl(),
      projectOffice: new FormControl({ value: '' }),
      projectDirector: new FormControl(),
      toDate: new FormControl({ value: '' }),
      fromDate: new FormControl({ value: '' }),
    });
  }
  ngOnDestroy(): void {
    if (this.subsOf) {
      this.subsOf.unsubscribe();
    }
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  reactiveForm() {
    this.data = new Project();
    this.myForm = this.fb.group({
      projectName: [this.data.name, [Validators.required]],
      fromDate: [this.data.startDate, [Validators.required]],
      toDate: [this.data.finishDate, [Validators.required]],
      projectOffice: [this.data.office, [Validators.required]],
      projectDirector: [this.data.projectDirector, [Validators.required]],
    });
  }

  public onSelectState(value: string): void {
    this.setEmployee(value);
    this.data.officeId = value;
  }
  save() {
    this.loader.loading = true;
    this.data.name = this.myForm.controls.projectName.value;
    this.data.startDate = this.myForm.controls.fromDate.value;
    this.data.finishDate = this.myForm.controls.toDate.value;
    this.data.office = this.officeControl.value;
    this.data.projectDirector = this.employeeControl.value;
    this.service.addProject(this.data).subscribe
      (
        (Response) => {
          console.log(this.data);
          this.toastService.openSnackBar(success_message.SAVED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loader.loading = false;
        },
        (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loader.loading = false;
        });
  }
  setEmployee(value) {
    this.subs.add(this.officeService.getEmployeeByOfficeId(value).subscribe((data) => {
      this.employee = data;
      this.filteredEmployees = this.filterService.filterData(this.employeeControl, this.employee, true);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      }));
  }
}
