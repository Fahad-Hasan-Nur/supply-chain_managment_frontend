import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Finance } from '../../model/finance';
import {StateService} from "../../../../common/service/state.service";

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: []
})
export class FinanceComponent implements OnInit {
  public toolbarOptions;
  myFormGroup: FormGroup;
  constructor(public fb: FormBuilder,
    public data: Finance,
              private stateService: StateService) {
  }

  ngOnInit() {
    // console.log(this.stateService.getProject())
    this.reactiveForm();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  reactiveForm() {
    this.data = new Finance();
    this.myFormGroup = this.fb.group({
      total: [this.data.total, [Validators.required]],
      gob: [this.data.gob, [Validators.required]],
      self: [this.data.self, [Validators.required]],
      other: [this.data.other, [Validators.required]],
      foreignCurrency: [this.data.foreignCurrency, [Validators.required]],
      source: [this.data.source, [Validators.required]],
    });
  }
  save() {
    this.data.total = this.myFormGroup.controls['total'].value;
    this.data.gob = this.myFormGroup.controls['gob'].value;
    this.data.self = this.myFormGroup.controls['self'].value;
    this.data.other = this.myFormGroup.controls['other'].value;
    this.data.foreignCurrency = this.myFormGroup.controls['foreignCurrency'].value;
    this.data.source = this.myFormGroup.controls['source'].value;
    console.log(this.data)
  }

}
