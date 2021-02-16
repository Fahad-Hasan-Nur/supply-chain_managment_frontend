import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [ 'উৎস', 'জিওবি','নিজস্ব অর্থায়ন', 'অন্যান্য'];
  dataSource = new MatTableDataSource<IPLData>(data);

  ngOnInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search(data){
  }
}
export interface IPLData {
  source: string;
  gob: string;
  finance : string;
  other : string;
}

const data: IPLData[] = [
  {source: 'A', gob: '1',finance :'12121',other: 'অন্যান্য'},
  {source: 'B', gob: '4',finance :'12121',other: 'অন্যান্য'},
  {source: 'C', gob: '8',finance :'1212121221',other: 'অন্যান্য'},
  {source: 'D', gob: '6',finance :'2121',other: 'অন্যান্য'},
  {source: 'E', gob: '7',finance :'34343',other: 'অন্যান্য'},
];


