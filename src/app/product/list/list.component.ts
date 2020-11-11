import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../lib/base-component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  list: any;
  menus:any;
  page: any;
  pageSize: any;
  totalItems: any;
  item_group_id: any;
  public items: any;
  name:any;
  SortDirection = 'asc';
  SortbyParam = '';
  public totalRecords: any;

  constructor(injector: Injector, private _rou: Router) {
    super(injector);
  }
  ngOnInit(): void {
    this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
    this.list = [];
    this.page = 1;
    this.pageSize = 5;
    this._route.params.subscribe(params => {
      this.item_group_id = params['id'];
      this._api.post('/api/items/search', { page: this.page, pageSize: this.pageSize, item_group_id: this.item_group_id }).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
      }, err => { });
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadScripts();
    });
  }
  search(timkiem) {
    this._rou.navigate(["/product/search", timkiem]);
  }

  loadPage(page) {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.post('/api/items/search', { page: page, pageSize: this.pageSize, item_group_id: id }).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
      }, err => { });
    });
  }
  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }
  onAsc() { 
    this._api.get('/api/item/get-data-asc',).takeUntil(this.unsubscribe).subscribe(res => {
      this.loadPage(this.page); 
      });
  }
}