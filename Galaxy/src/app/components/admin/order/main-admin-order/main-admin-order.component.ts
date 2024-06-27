import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { IOrderRead } from '../../../../Models/Order/order-read';
import { UserService } from '../../../../services/user.service';
import { IUserRead } from '../../../../Models/User/user-read';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../../components/shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-main-admin-order',
  templateUrl: './main-admin-order.component.html',
  styleUrls: ['./main-admin-order.component.css']
})
export class MainAdminOrderComponent implements OnInit {

  orders: ExtendedIOrderRead[] = [];
  orderStatusOptions: string[] = ['Cancelled', 'Pending', 'Delivered'];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders.map(order => {
          return {
            ...order,
            userName: ''
          };
        });

        this.orders.forEach(order => {
          this.userService.getUserById(order.userId).subscribe(
            (user: IUserRead) => {
              order.userName = `${user.firstName} ${user.lastName}`;
            },
            error => {
              console.error(`Error fetching user details for order ${order.id}:`, error);
            }
          );
        });
      },
      error => {
        console.error('Error loading all orders:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.orders.find(order => order.id === orderId);
    if (!order) return;
          this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
            () => {
              console.log(`Order ${orderId} status updated to ${newStatus}`);
              this.loadOrders();
            },
            error => {
              console.error('Error updating order status:', error);
            }
          );
        }

    confirmOrder(orderId: number, newStatus: string): void {
      const dialogRef = this.dialog.open(ConfirmMessageComponent, {
        data: { title : 'Cancel order',
           message: 'Are you sure you want to cancel this order?' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateOrderStatus(orderId,newStatus);
          const order = this.orders.find(order => order.id === orderId);
        // if (order && (newStatus === 'Cancelled' || newStatus === 'Delivered')) {
        //   order.disabled = true;
        // }
        }
      });
    }
  }
interface ExtendedIOrderRead extends IOrderRead {
  userName: string;
}
