import { Component, Injector, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../../lib/base-component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menus:any;
  total:any;
  items:any;
  quantity:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
    this._cart.items.subscribe((res) => {
      this.quantity = res? res.length:0;
    });
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.quantity=0;
      this.total=0;
      for(let x of this.items){ 
        x.money = x.quantity * x.item_price;
        this.total += x.quantity * x.item_price;
        this.quantity+=x.quantity;
      } 
    });
  }
  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadScripts();
    }); 
  }
}

