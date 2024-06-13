import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private unit:UnitService) { }
  cart:any;

  ngOnInit() {
    this.FetchCart()
    this.GetCart();
  }

  WishListCount(){
    return this.unit.wishlist.GetwishListCount();
  }

  FetchCart():void{
    this.unit.cart.FetchCart();
  }

  GetCart():void{
     this.unit.cart.GetCart().subscribe((cart:any)=>{
      this.cart = cart;
      this.GetCartItemsCount();
     })
  }

  isAuthunticated():boolean{
    return this.unit.auth.isAuthunicated();
  }
  logoutFunction():void{
    this.unit.auth.LogoutFunction();
  }
  
  GetCartItemsCount():number{
    let count = 0;
    for(let i = 0;i<this.cart?.length;i++){
      count += +this.cart[i].cartProductQuantity;
    }
    return count;
  }

}
