import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-main-wishlist',
  templateUrl: './main-wishlist.component.html',
  styleUrl: './main-wishlist.component.css'
})
export class MainWishlistComponent implements OnInit {
  constructor(private unit: UnitService) { }
  wishlistproducts: any;
  ngOnInit(): void {
    this.unit.wishlist.GetWishList().subscribe((res: any) => {
      this.unit.cart.GetCart().subscribe((cart: any) => {
        this.wishlistproducts = res;
        this.wishlistproducts = this.ChangeProductsInCart(res, cart)
      })
    })
  }

  ChangeProductsInCart(productsArray: any, cartArray: any[]): any[] {
    return productsArray?.map((product:any) => {
      const isInCart = this.unit.products.isProductExiestInCart(cartArray, product);
      return { ...product, incart: isInCart };
    });
  }

}
