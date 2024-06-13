import { Component, Input } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {

  @Input() orders :any

  constructor(private unit:UnitService){}

  CancelOrders(orderId:number):void{
    this.unit.order.CancelOrder(orderId);
  }
}
