import { ChitietComponent } from './chitiet/chitiet.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chitiet/:id',
    component: ChitietComponent,
  },
  {
    path: 'list/:id',
    component: ListComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ChitietComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    ListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
