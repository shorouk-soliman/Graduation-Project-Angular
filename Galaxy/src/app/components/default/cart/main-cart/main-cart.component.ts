import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.css']
})
export class MainCartComponent implements OnInit {

  constructor(private unit: UnitService) { }

  cart: ICartItem[] = [];

  ngOnInit() {
    this.GetCart();
  };

  FetchCart(): void {
    this.unit.cart.FetchCart();
  };

  GetCart(): void {
    this.unit.cart.GetCart().subscribe((cartData: ICartItem[]) => {
      this.cart = cartData;
    });
  };

};