import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Project} from "../prj-planning/model/project";
import {ProjectService} from "../../service/project/project.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor( private project: Project,
               private service: ProjectService ) { }

  ngOnInit() {
    this.display();
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((document.querySelectorAll('.mat-tab-label-content')[i] as HTMLElement).innerText == tabName) {
        (document.querySelectorAll('.mat-tab-label')[i] as HTMLElement).click();
      }
    }
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
}
