import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-cart-order-form',
  templateUrl: './cart-order-form.component.html',
  styleUrls: ['./cart-order-form.component.css']
})
export class CartOrderFormComponent implements OnInit {

  constructor(private unit: UnitService) { }

  @Input() cartItems: any;

  myForm: FormGroup = this.unit.formbuilder.group({
    address: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$')]]
  });

  ngOnInit() {
  }


  GetTotalPrice() {
    let total = 0;
    this.cartItems.forEach((item: any) => {
      if (item.product.discount > 0) {
        total += (item.product.price -item.product.price * (item.product.discount / 100)) * item.cartProductQuantity;
      } else {
        total += item.product.price * item.cartProductQuantity;
      }
    });
    return total;
  }

  isStripeOptionValid():boolean{
    return this.GetTotalPrice() >= 999999 ||  this.GetTotalPrice() <= 0.50
  }

  PlaceOrder(): void {
    if(this.myForm.invalid) return;

    this.unit.order.Checkout(this.myForm.value)
  }

  
}

