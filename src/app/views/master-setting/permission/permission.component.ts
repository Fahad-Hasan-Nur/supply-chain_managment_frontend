import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {

  public displayedColumns: string[] = ['privilage', 'সুপার এডমিন', 'জিইডি লেখক', 'প্রকল্প ব্যবস্থাপক', 'প্রকল্প সদস্য', 'সচিব'];
  public dataSource = new MatTableDataSource<IPLData>(data);
  form: FormGroup;
  
  ngOnInit() {
  }
  constructor(private fb: FormBuilder) { }
  onChange(name: string, isChecked: boolean) {

    if (isChecked) {
      //Need APi Implementaton
    } else {
      //Need APi Implementaton
    }
  }
}
export interface IPLData {
  admin: boolean;
  gedAuthor: boolean;
  pd: boolean;
  pdMember: boolean;
  secretary: boolean;
  privilage: string;
}

const data: IPLData[] = [
  {privilage: 'ড্যাশবোর্ড​', admin: true, gedAuthor : true, pd : true, pdMember: true, secretary : true},
  {privilage: 'সার-সংক্ষেপ', admin: true, gedAuthor : false, pd : false, pdMember: true, secretary : true},
  {privilage: 'নতুন প্রকল্প তৈরি',admin: true, gedAuthor : false, pd : false, pdMember: true, secretary : true},
  {privilage: 'প্রকল্পের তালিকা', admin: true, gedAuthor : true, pd : true, pdMember: false, secretary : false},
  {privilage: 'কার্যের তথ্য তৈরি  ',admin: false, gedAuthor : false, pd : false, pdMember: false, secretary : false},
  {privilage: 'অনুচ্ছেদ', admin: true, gedAuthor : true, pd : false, pdMember: false, secretary : false},
  {privilage: 'নতুন অনুচ্ছেদ', admin: true, gedAuthor : false, pd : true, pdMember: true, secretary : true},
  {privilage: 'অনুচ্ছেদের তালিকা',admin: false, gedAuthor : true, pd : false, pdMember: false, secretary : true},
  {privilage: 'রিপোর্ট',admin: false, gedAuthor : false, pd : false, pdMember: false, secretary : false},
  {privilage: 'প্রকল্পের রিপোর্ট',admin: true, gedAuthor : true, pd : true, pdMember: false, secretary : true},
  {privilage: 'গ্যান্ট চার্ট', admin: false, gedAuthor : false, pd : true, pdMember: true, secretary : false},
  {privilage: 'মাস্টার সেটিংস',admin: true, gedAuthor : false, pd : true, pdMember: false, secretary : false},
  {privilage: 'ইউজার-রোল', admin: false, gedAuthor : true, pd : false, pdMember: true, secretary : true},
  {privilage: 'অনুমতি', admin: true, gedAuthor : false, pd : true, pdMember: true, secretary : false},
];
