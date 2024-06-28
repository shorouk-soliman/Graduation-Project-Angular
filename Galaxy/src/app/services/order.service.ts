import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { IOrderHistory, initOrderHistory } from '../Models/Order/order-history';
import { IOrderRead } from '../Models/Order/order-read';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  OrdersSubject: BehaviorSubject<IOrderHistory> = new BehaviorSubject<IOrderHistory>(initOrderHistory);
  
  AdminSalesOrdersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  UserDeleverdCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private generic: GenericService) { }

  SetAdminSalesOrdersCount(num:number):void{
    this.AdminSalesOrdersCount.next(num);
  }

  GetAdminSalesCount():Observable<number>{
    return this.AdminSalesOrdersCount.asObservable();
  }
  GetUserDeleverdCount():Observable<number>{
    return this.UserDeleverdCount.asObservable();
  }

  FetchUserOrders(page: number, sort: string): void {
    let Url: string = `Order/ViewOrderHistory?page=${page}&sort=${sort}`;
    this.generic.getRequest<IOrderHistory>(Url).subscribe((orders: IOrderHistory) => {
      this.OrdersSubject.next(orders);
    });
  }

  GetUserOrders(): Observable<IOrderHistory> {
    return this.OrdersSubject.asObservable();
  }

  Checkout(address: any): void {
    let Url: string = `Order/Checkout?address=${address.address}`;
    this.generic.postRequest<any>(Url, { address: address }, { responseType: 'text' })
      .subscribe((sessionUrl: string) => {
        window.location.href = sessionUrl;
      });
  }

  CancelOrder(orderId: number): void {
    let Url: string = `Order/CancelOrder?orderId=${orderId}`;
    this.generic.deleteRequest<any>(Url).subscribe(() => {
      this.updatingOrdersafterCancel(orderId);
    });
  }

  GetUserOrderCount(): void {
    let Url: string = `Order/GetDeliveredCount`;

    this.generic.getRequest<number>(Url).subscribe((count:number)=>{

      let localCount = Number(localStorage.getItem('count'))
      if(localCount !== null || undefined)
        this.UserDeleverdCount.next(count - localCount);
      
      localStorage.setItem('count',count.toString());
    });
  }



  private updatingOrdersafterCancel(id: number): void {
    let oldOrderValue = this.OrdersSubject.getValue().orders;

    let modifiedOrdersArray = oldOrderValue.map((order: IOrderRead) => {
      if (+order.id === +id) order.status = 'Cancelled';
      return order;
    });

    this.OrdersSubject.next({ ...this.OrdersSubject.getValue(), orders: modifiedOrdersArray });
  }

  getAllOrders(): Observable<IOrderRead[]> {
    let Url: string = `Order/GetAllOrders`;
    return this.generic.getRequest<IOrderRead[]>(Url);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    let Url: string = `Order/ChangeOrderStatus?orderId=${orderId}&newStatus=${newStatus}`;
    return this.generic.putRequest<any>(Url, {});
  }

}
