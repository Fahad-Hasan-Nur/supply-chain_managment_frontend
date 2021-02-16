import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { success_message } from '../../../../common/constant/messages';
import { MomentUtcDateAdapter } from '../../../../common/service/MomentUtcDateAdapter';
import { ToastService } from '../../../../common/service/toast.service';
import { ProjectService } from '../../../../service/project/project.service';
import { Project } from '../../../prj-planning/model/project';
import { Layer } from '../../model/layer';
import { LayerOfficeBrief } from '../../model/layer-office-brief';
import { LoaderComponent } from '../loader/loader.component';
import {StateService} from "../../../../common/service/state.service";
import {MY_FORMATS} from "../../../../common/constant/global-variables.constant";

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class ProjectOverviewComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;
  @Input('project') project: Project;

  public ministryOfficeList: LayerOfficeBrief[] = [];
  public planningDivisionOfficeList: LayerOfficeBrief[] = [];
  public layer: Layer[] = [];
  public maxDate: any;
  public minDate: any;
  public myFilter: any;

  constructor(public route: ActivatedRoute,
              private service: ProjectService,
              private toastService: ToastService,
              private stateService: StateService) {}
  ngOnInit() {
    this.project.id = this.route.snapshot.params.id;
    this.getMinisters();
    this.getLayers();
  }

  getLayers(){
    this.service.getLayers().subscribe((data) => {
      this.layer = data;
      this.getDivisions();
    },(err) => {
      console.log(err);
    });

  }
  getMinisters(){
    this.service.getMinistry().subscribe((data) => {
        this.ministryOfficeList = data;
      },
      (err) => {
        console.log(err);
      })
  }

  save() {
    this.service.updateProject(this.project).subscribe
      (
        (response) => {
          console.log(response)
          this.project = response;
          this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loader.loading = false;
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loader.loading = false;
        });
  }
  display() {
    this.service.getPrjOverview(this.project.id).subscribe
      (
        (response) => {
          this.project = response;
        },
        (error) => console.log(error),
      );
  }
  getDivisions() {
    this.layer.forEach((ob) => {
      if (ob.nameEn == 'Division') {
        this.service.getListByDivisionId(ob.oid).subscribe((data) => {
          this.planningDivisionOfficeList = data;
        }, (error) => {
          console.log(error)
        });
      }
    });
  }

  setStateProject(project: Project): void{
    this.stateService.setProject(project);
  }
}
