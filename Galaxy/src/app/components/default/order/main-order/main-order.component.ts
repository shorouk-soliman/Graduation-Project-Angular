import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IOrderHistory, initOrderHistory } from '../../../../Models/Order/order-history';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrl: './main-order.component.css'
})
export class MainOrderComponent implements OnInit {

  constructor(private unit: UnitService) { }

  orders: IOrderHistory = initOrderHistory;
  page: number = 1;
  sort: string = 'all';

  ngOnInit(): void {
    this.FetchUserOrders(this.page);
    this.GetUserOrders()
  };

  getSort() {
    return this.sort;
  };

  FetchUserOrders(page: number): void {
    this.page = page;
    this.unit.order.FetchUserOrders(page, this.sort);
  };

  GetUserOrders(): void {
    this.unit.order.GetUserOrders().subscribe((ordersData: IOrderHistory) => {
      this.orders = ordersData;
    });
  };

  SetSort(sort: string): void {
    this.sort = sort;
    this.page = 1;
    this.FetchUserOrders(1);
  };

}
