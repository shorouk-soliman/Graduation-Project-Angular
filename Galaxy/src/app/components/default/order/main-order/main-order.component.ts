import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrl: './main-order.component.css'
})
export class MainOrderComponent implements OnInit {

  constructor(private unit: UnitService) { }

  page: number = 1;
  TotalPages: number = 0;
  orders: any;
  sort: string = 'all';

  ngOnInit(): void {
    this.FetchUserOrders(this.page);
    this.GetUserOrders()
  }

  getSort(){
    return this.sort;
  }

  FetchUserOrders(page: number): void {
    this.unit.order.FetchUserOrders(page,this.sort);
  }

  GetUserOrders(): void {
    this.unit.order.GetUserOrders().subscribe((ordersData: any) => {
      this.orders = ordersData.orders;
      this.TotalPages = ordersData.totalPages
    });
  }

  SetSort(sort: string): void {
    this.sort = sort;
    this.page = 1;
    this.FetchUserOrders(1);
  }

}
