import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserRead, initUserRead } from '../../../../Models/User/user-read';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  count: number = 0;
  timer$!: Observable<number>;
  totalSales = 0;

  constructor(private unit: UnitService,private router: Router) {
  }
  user: IUserRead = initUserRead;

  ngOnInit(): void {
    this.timer$ = interval(2000);
    this.timer$.pipe(take(50)).subscribe(() => {
      this.count++;

    });
    this.getUser();

  }
  getUser():void {
    this.unit.user.GetUser().subscribe((user: IUserRead) => {
      this.user = user;
    })
  };
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/User/login');
  }
}
