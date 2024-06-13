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
    this.unit.category.FetchGeneralCategories()
    this.unit.wishlist.GetWishList();
  }
  title = 'Galaxy';
}
