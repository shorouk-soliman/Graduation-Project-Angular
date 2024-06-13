import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private general:GeneralService) { }

  OrdersSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);



  FetchUserOrders(page:number,sort :string):void{
    const GetUserOrdersURL = `${this.general.API}Order/ViewOrderHistory?page=${page}&sort=${sort}`;
    this.general.http.get(GetUserOrdersURL).subscribe((orders:any)=>{
      this.OrdersSubject.next(orders);
    })
  }

  GetUserOrders():Observable<any>{
    return this.OrdersSubject.asObservable();
  }

  Checkout(address:any):void{
    const CheckoutURL = `${this.general.API}Order/Checkout?address=${address.address}`;
    this.general.http.post(CheckoutURL,{address:address},{ responseType: 'text' })
    .subscribe((sessionURL:string)=>{
      window.location.href = sessionURL;
    });
  }

  CancelOrder(orderId:number):void{
    const CancelOrderURL = `${this.general.API}Order/CancelOrder?orderId=${orderId}`;
    this.general.http.delete(CancelOrderURL).subscribe(()=>{
      this.updatingOrdersafterCancel(orderId);
    })
  }

  private updatingOrdersafterCancel(id: any) {
    let oldOrderValue = this.OrdersSubject.getValue().orders;
  
    let modifiedOrdersArray = oldOrderValue.map((order: any) => {
      if (order.id === id) order.status = 'Cancelled';
      return order;
    });
  
    this.OrdersSubject.next({ ...this.OrdersSubject.getValue(), orders: modifiedOrdersArray });
  }
  

}
