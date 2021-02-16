import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../common/constant/nav.constant';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  constructor(public router : Router) { }


  // displayedColumns: string[] = ['Number', 'Goal', 'category', 'ক্রিয়া'];
  // dataSource = new MatTableDataSource<IPLData>(data);
  // showFilters: boolean;
  ngOnInit() {
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
  }
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  // applyFilter(filterValue: any) {
  //     this.dataSource.filter = filterValue.value.trim().toLowerCase();
  // }
  // search(data){

  // }
  // viewAddArticalPage(){
  //   this.router.navigateByUrl(URL.PRJ_ARTICLE_ADD);
  // }

}
// export interface IPLData {
//   Goal: string;
//   category: string;
//   number: number;
// }

// const data: IPLData[] = [

//   {Goal: 'দারিদ্র্য বিমোচন', category: 'SDG',number:1},
//   {Goal: 'লিঙ্গ বৈষম্য দূর করা', category: 'GED',number:2},
//   {Goal: 'সবার জন্য পানি নিশ্চিত করা', category: 'SDG',number:3},
//   {Goal: 'লিঙ্গ বৈষম্য দূর করা', category: 'GED',number:4},
//   {Goal: 'দারিদ্র্য বিমোচন', category: 'SDG',number:5},
//   {Goal: 'সবার জন্য পানি নিশ্চিত করা', category: 'GED',number:6},
//   {Goal: 'দারিদ্র্য বিমোচন', category: 'SDG',number:7},
// ];
