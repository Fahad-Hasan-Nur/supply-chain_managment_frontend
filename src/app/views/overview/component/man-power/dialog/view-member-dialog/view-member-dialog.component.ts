import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-member-dialog',
  templateUrl: './view-member-dialog.component.html',
  styleUrls: ['./view-member-dialog.component.scss']
})
export class ViewMemberDialogComponent implements OnInit {
  myFormGroup : FormGroup;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { 
  this.myFormGroup = new FormGroup({
    memberName: new FormControl('ফাহাদ'),
    memberOffice: new FormControl('nishad'),
    memberBranch: new FormControl('Dhaka'),
    memberPost: new FormControl('PD'),
  });
  }
  onNoClick(){
    this.dialog.closeAll();
  }
  reactiveForm() {
  
  }
}
