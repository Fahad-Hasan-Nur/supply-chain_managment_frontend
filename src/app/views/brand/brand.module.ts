import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Brand } from '../../common/model/brand';
import { DemoMaterialModule } from '../../material.module';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { BrandViewComponent } from './dialog/brand-view/brand-view.component';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [BrandComponent, BrandListComponent, BrandAddComponent,LoaderComponent,BrandViewComponent],
  entryComponents: [
    BrandViewComponent,
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  
  providers: [DatePipe,Brand],
})
export class BrandModule {
  constructor() {
    console.log('brand-module loaded');
  }
}
