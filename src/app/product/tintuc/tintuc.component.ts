import { BaseComponent } from '../../lib/base-component';
import { Component, OnInit, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})

export class TintucComponent extends BaseComponent implements OnInit {
  menus:any;
  item:any;
  list_item_same_type:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
     
    this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
    
    this.item = {};
    let id='';
    this._route.params.subscribe(params => {
      id = params['id'];
    });
    this.getByID(id);
  }
  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadScripts();
    }); 
  }
  getByID(id){
    this._api.get('/api/news/get_tintuc_id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
    this.item = res;
   
    this.getByCategory(res.item_group_id)      
    setTimeout(() => {
        this.loadScripts();
      });
    });
  }
  getByID1(id){
    this._api.get('/api/item/get_by_id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
    this.item = res;
   
    this.getByCategory(res.item_group_id)      
    setTimeout(() => {
        this.loadScripts();
      });
    });
  }
  getByCategory(id){
    this._api.get('/api/items/get-same-item/'+id).takeUntil(this.unsubscribe).subscribe(res => {
    this.list_item_same_type = res;
    setTimeout(() => {
        this.loadScripts();
      });
    }); 
  }

  addToCart(item) { 
    this._cart.addToCart(item);
    alert('Thêm thành công!'); 
  }
 
}