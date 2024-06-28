import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IUserRead } from '../../../../Models/User/user-read';

@Component({
  selector: 'app-main-admin-user',
  templateUrl: './main-admin-user.component.html',
  styleUrls: ['./main-admin-user.component.css']
})
export class MainAdminUserComponent implements OnInit {

  users: IUserRead[] = [];

  constructor(private unit: UnitService) {}

  ngOnInit(): void {
    this.GetAllUsers();
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
    this.unit.user.DeleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    }, (error: any) => {
      console.error('Error deleting user', error);
    });
  }
}
