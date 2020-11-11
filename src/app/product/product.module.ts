import { ListComponent } from './list/list.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { TintucComponent } from './tintuc/tintuc.component';
const routes: Routes = [
  {
    path: 'chitiet/:id',
    component: ChitietComponent,
  },
  {
    path: 'tintuc/:id',
    component: TintucComponent,
  },
   {
    path: 'search/:id',
    component: SearchComponent,
  },
  {
    path: 'list/:id',
    component: ListComponent,
  },
];  
@NgModule({
  declarations: [ChitietComponent,ListComponent, SearchComponent, TintucComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductModule { }