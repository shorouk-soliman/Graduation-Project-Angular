import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { IProducts } from '../../../Models/Product/products-model';
import { ICartItem } from '../../../Models/Cart-Items/Cart-item-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-wishlist',
  templateUrl: './main-wishlist.component.html',
  styleUrl: './main-wishlist.component.css'
})
export class MainWishlistComponent implements OnInit {
  constructor(private unit: UnitService) { }
  wishlistproducts: IProducts[] = [];


  ngOnInit(): void {
    this.GetWishListProducts()
  };

  GetWishListProducts() {
    this.unit.wishlist.GetWishList().subscribe((wishListProducts: IProducts[]) => {
      wishListProducts.map((wlProduct:IProducts) => wlProduct.inWishList = true);
      this.unit.cart.GetCart().subscribe((cartItems: ICartItem[]) => {
        this.wishlistproducts = this.unit.products.ChangeProductsInCart(wishListProducts, cartItems);
      });
    });
  }
  

}
