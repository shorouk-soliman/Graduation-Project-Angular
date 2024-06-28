import { Component, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private unit: UnitService,private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  @Input() cartItems: ICartItem[] = [];

  ngOnInit() {
  };

  LodingCart(): boolean {
    return this.unit.cart.loading;
  };

  UpdateQuantity(productId: number, event: any): void {
    let newQuantity = event.target.value;
    this.unit.cart.UpdateItemQuantity(productId, newQuantity);
  };

  RemoveProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to remove this product in your cart?`,
    title: 'Remove product'  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.cart.RemoveFromCart(productId);
      }
      else{
        return;
      }
    });
  };

  clearCart() {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to clear your cart?`,
    title: 'Remove product'  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.cart.clearCart();
          }
          else{
            return;
          }
    });
  };

};
