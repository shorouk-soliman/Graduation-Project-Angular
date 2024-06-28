import { Component, OnInit } from '@angular/core';
import { UnitService } from './services/unit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private unit:UnitService){}
  ngOnInit(): void {
    this.unit.cart.CreateLocalCart();
    this.unit.cart.FetchCart();
    this.unit.brand.FetchGeneralBrands();
    this.unit.category.fetchGeneralCategories()
    this.unit.wishlist.fetchWishList();
    this.unit.user.FetchUser();
    this.unit.order.GetUserOrderCount();
  }
  title = 'Galaxy';

  GetLoadingStatus():boolean{
    return this.unit.isloading;
  }

}
