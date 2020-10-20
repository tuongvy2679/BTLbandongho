import { BaseComponent } from './../lib/base-component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  list_item:any;
  list: any;
  page: any;
  pageSize: any;
  totalItems:any;
  item_group_id:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('/api/items/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item = res[0];


      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    this.list = [];
    this.page = 1;
    this.pageSize = 5;
    this._route.params.subscribe(params => {
      this.item_group_id = params['id'];
      this._api.post('/api/items/search', { page: this.page, pageSize: this.pageSize, item_group_id: this.item_group_id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });       
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
  
  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadScripts();
    }); 
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
}
