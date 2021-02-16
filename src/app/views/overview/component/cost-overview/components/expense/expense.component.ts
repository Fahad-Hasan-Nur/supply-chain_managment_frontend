import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Expense } from '../../../../model/expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @Input() public expense : MatTableDataSource<Expense>;

  public total : number=77123;
  constructor() { }

  displayedColumns: string[] = ['sub-code', 'description', 'unit','unit-rate','quantity','total-cost','gob','self-gob','other','percentage'];
  dataSource = new MatTableDataSource;


  ngOnInit() {
    this.dataSource=this.expense
  }

}

// export interface Data {
//   subCode: number;
//   description: string;
//   unit: number;
//   unitRate: number;
//   quantity : number;
//   totalCost : number;
//   gob : number;
//   selfGob : number;
//   other : number;
//   percentage : number;
// }

// const data: Data[] = [
//   {subCode: 1212,description : ' কর্মকর্তাদের বেতন',unit :1,unitRate :100,quantity: 1, totalCost:3440,gob :1, selfGob :12, other : 1, percentage : 62},
//   {subCode: 3412,description : ' বাড়ি ভাড়া',unit :1,unitRate :80,quantity: 10, totalCost:4440,gob :1, selfGob :17, other : 0, percentage : 12},
//   {subCode: 6712,description : ' অফিসার বেতন',unit :1,unitRate :990,quantity: 70, totalCost:6620,gob :1, selfGob :33, other : 9, percentage : 82},
//   {subCode: 7712,description : ' পরিবহন খরচ',unit :1,unitRate :120,quantity: 18, totalCost:2200,gob :1, selfGob :62, other : 0, percentage : 22},
// ];
