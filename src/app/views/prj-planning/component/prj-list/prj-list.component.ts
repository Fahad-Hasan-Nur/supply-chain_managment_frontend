import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../../common/constant/nav.constant';
import { ProjectService } from '../../../../service/project/project.service';
import { Project } from '../../model/project';
import { PrjViewComponent } from '../prj-view/prj-view.component';

@Component({
  selector: 'app-prj-list',
  templateUrl: './prj-list.component.html',
  styleUrls: ['./prj-list.component.scss']
})
export class PrjListComponent implements OnInit {

  constructor(private http: HttpClient, private service: ProjectService,public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public project: Project[] = [];
  public displayedColumns: string[] = ['name', 'director', 'office','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public prjId: string;

  public ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getProjects().subscribe
      (
        (response) => {
          this.project = response;
          this.dataSource.data = response as Project[];
        },
        (error) => console.log(error)
      )
  }
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  search(project) {
  }
  viewPrjOverviewPage(id){
    this.route.navigateByUrl(URL.PRJ_OVERVIEW_ID + id);
  }
  openDialogView(id?) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        prjId: id
    };
    this.dialog.open(PrjViewComponent, dialogConfig);
  }

}

