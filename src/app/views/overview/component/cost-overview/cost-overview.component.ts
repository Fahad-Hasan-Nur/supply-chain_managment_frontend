import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Expense } from '../../model/expense';

@Component({
  selector: 'app-cost-overview',
  templateUrl: './cost-overview.component.html',
  styleUrls: []
})
export class CostOverviewComponent implements OnInit {
  constructor() { }
  taxExpenseData=new MatTableDataSource<Expense>(taxExpense);
  serviceExpenseData=new MatTableDataSource<Expense>(serviceExpense);
  constructionExpenseData=new MatTableDataSource<Expense>(constructionExpense);
  capitalExpenseData=new MatTableDataSource<Expense>(capitalExpense);
  buildExpenseData=new MatTableDataSource<Expense>(buildExpense);
  ngOnInit() {
  }
  total: number = 56124;

}
 // কর ব্যয়
 const taxExpense: Expense[] = [
  { subCode: 1212, description: ' কর্মকর্তাদের বেতন', unit: 1, unitRate: 100, quantity: 1, totalCost: 3440, gob: 1, selfGob: 12, other: 1, percentage: 62 },
  { subCode: 3412, description: ' বাড়ি ভাড়া', unit: 1, unitRate: 80, quantity: 10, totalCost: 4440, gob: 1, selfGob: 17, other: 0, percentage: 12 },
  { subCode: 6712, description: ' অফিসার বেতন', unit: 1, unitRate: 990, quantity: 70, totalCost: 6620, gob: 1, selfGob: 33, other: 9, percentage: 82 },
  { subCode: 7712, description: ' পরিবহন খরচ', unit: 1, unitRate: 120, quantity: 18, totalCost: 2200, gob: 1, selfGob: 62, other: 0, percentage: 22 },
];
//সংগ্রহ এবং সেবা
const serviceExpense: Expense[] = [
  { subCode: 1212, description: ' কর্মকর্তাদের বেতন', unit: 1, unitRate: 100, quantity: 1, totalCost: 3440, gob: 1, selfGob: 12, other: 1, percentage: 62 },
  { subCode: 3412, description: ' বাড়ি ভাড়া', unit: 1, unitRate: 80, quantity: 10, totalCost: 4440, gob: 1, selfGob: 17, other: 0, percentage: 12 },
  { subCode: 6712, description: ' অফিসার বেতন', unit: 1, unitRate: 990, quantity: 70, totalCost: 6620, gob: 1, selfGob: 33, other: 9, percentage: 82 },
  { subCode: 7712, description: ' পরিবহন খরচ', unit: 1, unitRate: 120, quantity: 18, totalCost: 2200, gob: 1, selfGob: 62, other: 0, percentage: 22 },
];
// মেরামত, সংগ্রহ এবং পুনরবাশন
const constructionExpense: Expense[] = [
  { subCode: 1212, description: ' কর্মকর্তাদের বেতন', unit: 1, unitRate: 100, quantity: 1, totalCost: 3440, gob: 1, selfGob: 12, other: 1, percentage: 62 },
  { subCode: 3412, description: ' বাড়ি ভাড়া', unit: 1, unitRate: 80, quantity: 10, totalCost: 4440, gob: 1, selfGob: 17, other: 0, percentage: 12 },
  { subCode: 6712, description: ' অফিসার বেতন', unit: 1, unitRate: 990, quantity: 70, totalCost: 6620, gob: 1, selfGob: 33, other: 9, percentage: 82 },
  { subCode: 7712, description: ' পরিবহন খরচ', unit: 1, unitRate: 120, quantity: 18, totalCost: 2200, gob: 1, selfGob: 62, other: 0, percentage: 22 },
];
// মূলধন ব্যয়
const capitalExpense: Expense[] = [
  { subCode: 1212, description: ' কর্মকর্তাদের বেতন', unit: 1, unitRate: 100, quantity: 1, totalCost: 3440, gob: 1, selfGob: 12, other: 1, percentage: 62 },
  { subCode: 3412, description: ' বাড়ি ভাড়া', unit: 1, unitRate: 80, quantity: 10, totalCost: 4440, gob: 1, selfGob: 17, other: 0, percentage: 12 },
  { subCode: 6712, description: ' অফিসার বেতন', unit: 1, unitRate: 990, quantity: 70, totalCost: 6620, gob: 1, selfGob: 33, other: 9, percentage: 82 },
  { subCode: 7712, description: ' পরিবহন খরচ', unit: 1, unitRate: 120, quantity: 18, totalCost: 2200, gob: 1, selfGob: 62, other: 0, percentage: 22 },
];
//নির্মাণ
const buildExpense: Expense[] = [
  {subCode: 1,description : ' কর্মকর্তাদের বেতন',unit :1,unitRate :100,quantity: 1, totalCost:3440,gob :1, selfGob :12, other : 1, percentage : 62},
  {subCode: 1,description : ' বাড়ি ভাড়া',unit :1,unitRate :80,quantity: 10, totalCost:4440,gob :1, selfGob :17, other : 0, percentage : 12},
  {subCode: 1,description : ' অফিসার বেতন',unit :1,unitRate :990,quantity: 70, totalCost:6620,gob :1, selfGob :33, other : 9, percentage : 82},
  {subCode: 1,description : ' পরিবহন খরচ',unit :1,unitRate :120,quantity: 18, totalCost:2200,gob :1, selfGob :62, other : 0, percentage : 22},
];
