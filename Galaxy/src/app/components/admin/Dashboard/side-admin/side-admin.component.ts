import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-side-admin',
  templateUrl: './side-admin.component.html',
  styleUrls: ['./side-admin.component.css']
})
export class SideAdminComponent implements OnInit {
  count: number = 0;
  timer$!: Observable<number>;
  totalSales = 0;

  constructor(private router: Router,private unit: UnitService) {}

  ngOnInit(): void {
    this.timer$ = interval(2000);
    this.timer$.pipe(take(10)).subscribe(() => {
      this.count++;
    });
  }

  logoutFunction(): void {
    this.unit.auth.LogoutFunction();
    this.router.navigateByUrl('/User/login');
  };
}
