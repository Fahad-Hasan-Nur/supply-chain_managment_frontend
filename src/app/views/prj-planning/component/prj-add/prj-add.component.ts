import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { success_message } from '../../../../common/constant/messages';
import { FilterService } from '../../../../common/service/filter.service';
import { MomentUtcDateAdapter } from '../../../../common/service/MomentUtcDateAdapter';
import { StateService } from "../../../../common/service/state.service";
import { ToastService } from '../../../../common/service/toast.service';
//import { OfficeService } from '../../../../service/office/office.service';
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
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class PrjAddComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

  public officeList: OfficeBrief[] = [];
  public employeeList: OfficeEmployee[] = [];
  public myFilter: any;
  public maxDate: any;
  public minDate: any;
  constructor(
  //  private officeService: OfficeService,
    private service: ProjectService,
    private toastService: ToastService,
    private filterService: FilterService,
    private stateService: StateService,
    public data: Project,
  ) {
  }
  ngOnInit() {
    this.setStateProject(this.data);
    this.getOffice();
  }

  getOffice() {
    // this.officeService.getOffice().subscribe((data) => {
    //   this.officeList = data;
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log(err);
    //   });
  }

  public onSelectState(value: string): void {
    this.setEmployee(value);
    this.data.officeId = value;
  }

  save() {
    this.loader.loading = true;
    this.service.addProject(this.stateService.getProject()).subscribe
      (
        (response) => {
          console.log(response);
          this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loader.loading = false;
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loader.loading = false;
        });
  }

  setEmployee(value) {
    // this.officeService.getEmployeeByOfficeId(value).subscribe((data) => {
    //   this.employeeList = data;
    //   console.log(this.employeeList);
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log(err);
    //   });
  }

  public setStateProject(project: Project): void {
    this.stateService.setProject(project);
  }
}
