import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../lib/base-component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
  list: any;
  page: any;
  pageSize: any;
  totalItems:any;
  item_name:any;
  public items: any;
 
  public totalRecords: any;

  public formsearch: any;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.list = [];
    this.page = 1;
    this.pageSize = 5;
    this._route.params.subscribe(params => {
      this.item_name = params['id'];
      this._api.post('/api/items/search1', { page: this.page, pageSize: this.pageSize, item_name: this.item_name}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });
   });
   this.formsearch = this.fb.group({
    'item_name': [''],
  });
  this.search1();
  }
  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadScripts();
    }); 
  }
  search1() {
    // debugger;
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/items/search1', { page: this.page, pageSize: this.pageSize, item_name: this.formsearch.get('item_name').value }).takeUntil(this.unsubscribe).subscribe(res => {
      this.items = res.data;
      this.totalRecords = res.totalItems;
      this.pageSize = res.pageSize;
    });
  }

  loadPage(page) { 
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.post('/api/items/search', { page: page, pageSize: this.pageSize, item_group_id: id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });       
   });   
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
 
   
}