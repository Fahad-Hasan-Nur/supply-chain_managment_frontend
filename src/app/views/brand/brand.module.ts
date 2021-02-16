import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandRoutingModule } from './brannd-routing.module';
import { BrandComponent } from './brand.component';
import { DemoMaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {SelectModule} from "ng-select";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    BrandComponent
  ],
  entryComponents: [],

  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule,
    NgSelectModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SelectModule,
  ],
  providers: []
})
export class BrandModule {
  constructor() {}
}
