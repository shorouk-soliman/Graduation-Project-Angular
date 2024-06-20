import { Component, Input } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IOrderItemRead } from '../../../../Models/Order Items/order-item-read';
import { IOrderRead } from '../../../../Models/Order/order-read';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {

  @Input() orders :IOrderRead[] = []

  constructor(private unit:UnitService){}

  CancelOrders(orderId:number):void{
    this.unit.order.CancelOrder(orderId);
  }
}
