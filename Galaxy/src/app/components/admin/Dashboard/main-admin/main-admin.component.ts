import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserRead, initUserRead } from '../../../../Models/User/user-read';
import { UnitService } from '../../../../services/unit.service';
import { OrderService } from '../../../../services/order.service';
import { IOrderRead } from '../../../..//Models/Order/order-read';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  count: number = 0;
  timer$!: Observable<number>;
  totalSales = 0;

  user: IUserRead = initUserRead;
  users: IUserRead[] = [];
  UsersCount = 0;
  OrderCounter = 0;
  orders: IOrderRead[] = [];

  constructor(private unit: UnitService, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.timer$ = interval(2000);
    this.timer$.pipe(take(50)).subscribe(() => {
      this.count++;
    });
    this.getUser();
    this.GetAllUsers();
    this.loadOrders(); // Load orders when component initializes
    this.GetOrderCount();
  }

  getUser(): void {
    this.unit.user.GetUser().subscribe((user: IUserRead) => {
      this.user = user;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/User/login');
  }

  GetAllUsers(): void {
    this.unit.user.getAllUsers().subscribe((users: IUserRead[]) => {
      this.users = users;
      this.UsersCount = users.length - 1;
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: IOrderRead[]) => {
        this.orders = orders;
        let deliveredCount = orders.filter(order => order.status === 'Delivered').length;
        this.orderService.SetAdminSalesOrdersCount(deliveredCount);
      },
      error => {
        console.error('Error loading orders:', error);
      }
    );
  }

  GetOrderCount():void{
    this.orderService.GetAdminSalesCount().subscribe((count:number)=>{
      this.OrderCounter = count;
    });
  }
}
