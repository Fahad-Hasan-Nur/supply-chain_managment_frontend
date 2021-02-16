import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['year', 'gob', 'finance', 'other', 'total'];
  dataSource = new MatTableDataSource<IPLData>(data);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search(data) {
  }
}
export interface IPLData {
  year: string;
  gob: string;
  finance: string;
  total: string;
  other: string;
}

const data: IPLData[] = [
  { year: '2010-2020', total: '2300000', gob: '1', finance: '12121', other: 'অন্যান্য' },
  { year: '2010-2020', total: '450000', gob: '4', finance: '12121', other: 'অন্যান্য' },
  { year: '2010-2020', total: '560000000', gob: '8', finance: '1212121221', other: 'অন্যান্য' },
  { year: '2010-2020', total: '450000', gob: '6', finance: '2121', other: 'অন্যান্য' },
  { year: '2010-2020', total: '23999999', gob: '7', finance: '34343', other: 'অন্যান্য' },
];


