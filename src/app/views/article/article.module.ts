import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { DemoMaterialModule } from '../../material.module';
import { ArticleListComponent } from '../article/article-list/article-list.component';
import { AddArticleComponent } from '../article/add-article/add-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { QuillEditorComponent } from '../../common/component/editor/quill-editor.component';

@NgModule({
  declarations: [ArticleComponent, ArticleListComponent, AddArticleComponent,QuillEditorComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [DatePipe]
})
export class ArticleModule {
  constructor() {
    console.log('article-module loaded');
  }
}
