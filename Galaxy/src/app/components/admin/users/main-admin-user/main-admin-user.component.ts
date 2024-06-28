import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IUserRead, initUserRead } from '../../../../Models/User/user-read';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-admin-user',
  templateUrl: './main-admin-user.component.html',
  styleUrls: ['./main-admin-user.component.css']
})
export class MainAdminUserComponent implements OnInit {

  users: IUserRead[] = [];
  user: IUserRead = initUserRead;

  constructor(private unit: UnitService,private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllUsers();
  }
  getUser(): void {
    this.unit.user.GetUser().subscribe((user: IUserRead) => {
      this.user = user;
    });
  }
  GetAllUsers() {
    this.unit.user.getAllUsers().subscribe((users: IUserRead[]) => {
      this.unit.user.GetUser().subscribe((user:IUserRead)=>{
        let usersfilter = users.filter((u:IUserRead) => u.id !== user.id);
        this.users = usersfilter;
      })
    }, (error: any) => {
      console.error('Error fetching users', error);
    });
  }

  DeleteUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to delete this User?`,
      title: 'Delete User'  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.user.DeleteUser(userId).subscribe(() => {
          this.users = this.users.filter(user => user.id !== userId);
        }, (error: any) => {
          console.error('Error deleting user', error);
        });
      }
    });

  }
}
