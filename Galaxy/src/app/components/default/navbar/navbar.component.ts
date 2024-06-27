import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { ICartItem } from '../../../Models/Cart-Items/Cart-item-model';
import { IUserRead, initUserRead } from '../../../Models/User/user-read';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private unit: UnitService,private router: Router) { }
  cart: ICartItem[] = [];
  user: IUserRead = initUserRead;

  ngOnInit() {
    this.GetCart();
    this.getUser();
}

  getUser():void {
    this.unit.user.GetUser().subscribe((user: IUserRead) => {
      this.user = user;
    })
  };

  WishListCount():number{
    return this.unit.wishlist.GetwishListCount();
  };

  FetchCart(): void {
    this.unit.cart.FetchCart();
  };

  GetCart(): void {
    this.unit.cart.GetCart().subscribe((cart: ICartItem[]) => {
      this.cart = cart;
      this.GetCartItemsCount();
    });
  };

  isAuthunticated(): boolean {
    return this.unit.auth.isAuthunicated();
  };

  logoutFunction(): void {
    this.unit.auth.LogoutFunction();
    this.router.navigateByUrl('/User/login');

  };

  GetCartItemsCount(): number {
    let count = 0;
    for (let i = 0; i < this.cart?.length; i++) {
      count += +this.cart[i].cartProductQuantity;
    };
    return count;
  };

}
