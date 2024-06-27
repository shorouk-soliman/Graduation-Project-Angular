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

  ngOnInit() {
  };

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
  };

  isStripeOptionValid(): boolean {
    return this.GetTotalPrice() >= 999999 || this.GetTotalPrice() <= 0.50;
  };

  PlaceOrder(): void {
    if (this.myForm.invalid) return;
    this.unit.order.Checkout(this.myForm.value);
  };

};
//

// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, Validators } from '@angular/forms';
// import { UnitService } from '../../../../services/unit.service';
// import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';
// // import { LoadingButtonComponent } from '@coreui/angular';

// @Component({
//   selector: 'app-cart-order-form',
//   templateUrl: './cart-order-form.component.html',
//   styleUrls: ['./cart-order-form.component.css'],
//   // imports: [LoadingButtonComponent]

// })
// export class CartOrderFormComponent implements OnInit {
//   public loading = new Array(4);
//   constructor(private unit: UnitService) { }

//   @Input() cartItems: ICartItem[] = [];

//   myForm: FormGroup = this.unit.formbuilder.group({
//     address: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9 ]{6,}$')]]
//   });

//   ngOnInit() {
//   }

//   GetTotalPrice(): number {
//     let total = 0;
//     this.cartItems.forEach((cartitem: ICartItem) => {
//       if (cartitem.product.discount > 0) {
//         total += (cartitem.product.price - cartitem.product.price * (cartitem.product.discount / 100)) * cartitem.cartProductQuantity;
//       } else {
//         total += cartitem.product.price * cartitem.cartProductQuantity;
//       }
//     });
//     return total;
//   }

//   isStripeOptionValid(): boolean {
//     return this.GetTotalPrice() >= 999999 || this.GetTotalPrice() <= 0.50;
//   }

//   PlaceOrder(idx: number): void {
//     if (this.myForm.invalid) return;
//     if (!!this.loading[idx]) {
//       clearTimeout(this.loading[idx]);
//       this.loading[idx] = undefined;
//     } else {
//       this.loading[idx] = setTimeout(() => {
//         this.unit.order.Checkout(this.myForm.value);
//         this.loading[idx] = undefined;
//       }, 3000);
//     }
//   }

//  onChange(changeEvent: boolean, idx: number): void {
//     console.log(changeEvent, idx);
//   }
// }
