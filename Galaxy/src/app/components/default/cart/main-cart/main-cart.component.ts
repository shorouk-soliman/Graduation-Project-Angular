import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.css']
})
export class MainCartComponent implements OnInit {

  constructor(private unit:UnitService) { }

  cart:any;
  ngOnInit() {
    this.FetchCart();
    this.GetCart(); 
  }

  FetchCart():void{
    this.unit.cart.FetchCart();
  }

  GetCart():void{
    this.unit.cart.GetCart().subscribe((cartData:any)=>{
      this.cart = cartData
    });
  }

}
