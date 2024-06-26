import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IUserRead } from '../../../../Models/User/user-read';

@Component({
  selector: 'app-main-admin-user',
  templateUrl: './main-admin-user.component.html',
  styleUrl: './main-admin-user.component.css'
})
export class MainAdminUserComponent implements OnInit {

  users:IUserRead[] = [];
  constructor(private unit: UnitService){}

  ngOnInit(): void {
    this.GetAllUsers();
  }

GetAllUsers(){
  this.unit.user.getAllUsers().subscribe((users:IUserRead[])=>{
    this.users = users;
  });
}

  DeleteUser(userId:string){
    this.unit.user.DeleteUser(userId).subscribe();
  }

}
