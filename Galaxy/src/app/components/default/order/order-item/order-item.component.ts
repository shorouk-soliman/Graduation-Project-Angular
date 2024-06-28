import { Component, Input } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IOrderItemRead } from '../../../../Models/Order Items/order-item-read';
import { IOrderRead } from '../../../../Models/Order/order-read';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {

  @Input() orders :IOrderRead[] = []

  constructor(private unit:UnitService,private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog){}

  CancelOrders(orderId:number):void{
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to cancel this order?`,
      title: 'Cancel Order'  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.order.CancelOrder(orderId);
      }
    });
  }
}
