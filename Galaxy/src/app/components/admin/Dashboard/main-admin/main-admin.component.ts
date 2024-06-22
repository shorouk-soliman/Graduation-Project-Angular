import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  count: number = 0;
  timer$!: Observable<number>;
  totalSales = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timer$ = interval(2000);
    this.timer$.pipe(take(10)).subscribe(() => {
      this.count++;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/User/login');
  }
}
