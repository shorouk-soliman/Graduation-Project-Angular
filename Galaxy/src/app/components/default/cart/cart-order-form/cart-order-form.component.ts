import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';

@Component({
  selector: 'app-cart-order-form',
  templateUrl: './cart-order-form.component.html',
  styleUrls: ['./cart-order-form.component.css']
})
export class CartOrderFormComponent implements OnInit {

  constructor(private unit: UnitService) { }

  @Input() cartItems: ICartItem[] = [];
  myForm: FormGroup = this.unit.formbuilder.group({
    address: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9 ]{6,}$')]]
  });

  isLoading: boolean = false;
  isAuth():boolean{
   return this.unit.isAuthunicated();
  }
  ngOnInit() { }

  GetTotalPrice(): number {
    let total = 0;
    this.cartItems.forEach((cartitem: ICartItem) => {
      if (cartitem.product.discount > 0) {
        total += (cartitem.product.price - cartitem.product.price * (cartitem.product.discount / 100)) * cartitem.cartProductQuantity;
      } else {
        total += cartitem.product.price * cartitem.cartProductQuantity;
      }
    });
    return total;
  }

  isStripeOptionValid(): boolean {
    return this.GetTotalPrice() >= 999999 || this.GetTotalPrice() <= 0.50;
  }

  async PlaceOrder(): Promise<void> {
    if (this.myForm.invalid) return;

    this.isLoading = true;

    try {
      await this.unit.order.Checkout(this.myForm.value);
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }
}
