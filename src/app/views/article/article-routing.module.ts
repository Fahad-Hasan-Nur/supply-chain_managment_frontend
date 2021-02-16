import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article.component';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,

    children: [
      {
      path:  URL_NAME.PRJ_ARTICLE_ADD,
      component:  AddArticleComponent,
      data: {
        title: MENU_NAME.PRJ_ARTICLE_ADD
      },
      },
      {
      path:  URL_NAME.PRJ_ARTICLE_LIST,
      component:  ArticleListComponent,
      data: {
        title: MENU_NAME.PRJ_ARTICLE_LIST
      },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
