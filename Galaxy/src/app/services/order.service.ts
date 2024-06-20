import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { IOrderHistory, initOrderHistory } from '../Models/Order/order-history';
import { IOrderRead } from '../Models/Order/order-read';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private generic: GenericService) { }

  OrdersSubject: BehaviorSubject<IOrderHistory> = new BehaviorSubject<IOrderHistory>(initOrderHistory);


  FetchUserOrders(page: number, sort: string): void {
    let Url:string  = `Order/ViewOrderHistory?page=${page}&sort=${sort}`;
    this.generic.getRequest<IOrderHistory>(Url).subscribe((orders: IOrderHistory) => {
      this.OrdersSubject.next(orders);
    });
  };

  GetUserOrders(): Observable<IOrderHistory> {
    return this.OrdersSubject.asObservable();
  };

  Checkout(address: any): void {
    let Url:string  = `Order/Checkout?address=${address.address}`;
    this.generic.postRequest<any>(Url, { address: address }, { responseType: 'text' })
      .subscribe((sessionUrl: string) => {
        window.location.href = sessionUrl;
      });
  };

  CancelOrder(orderId: number): void {
    let Url:string  = `Order/CancelOrder?orderId=${orderId}`;
    this.generic.deleteRequest<any>(Url).subscribe(() => {
      this.updatingOrdersafterCancel(orderId);
    });
  };

  private updatingOrdersafterCancel(id: number): void {
    let oldOrderValue = this.OrdersSubject.getValue().orders;

    let modifiedOrdersArray = oldOrderValue.map((order: IOrderRead) => {
      if (+order.id === +id) order.status = 'Cancelled';
      return order;
    });

    this.OrdersSubject.next({ ...this.OrdersSubject.getValue(), orders: modifiedOrdersArray });
  };


};