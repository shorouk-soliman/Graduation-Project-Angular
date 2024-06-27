import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CartService } from './cart.service';
import { ISign } from '../Models/Auth/sign-model';
import { ILogin } from '../Models/Auth/login-model';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  constructor(
    private generic: GenericService,
     private cartservice: CartService,
      private userService: UserService,
      private router: Router,
    ) { }

  Sign(signData: ISign): Observable<string> {
    const signUrl: string = `User/Signup`;

    return this.generic.postRequest<ISign>(signUrl, signData, { responseType: 'text' }).pipe(
      map((token: string) => {
        localStorage.setItem('jwt', token);
        this.cartservice.AddLocalCart();
        this.userService.FetchUser();
        if(this.isAdmin()){
          this.router.navigateByUrl('/admin');
        }else{
          this.router.navigateByUrl('/');
        }
        return token;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  Login(loginData: ILogin): Observable<string> {
    const loginUrl = `User/Login`;

    return this.generic.postRequest<ILogin>(loginUrl, loginData, { responseType: 'text' }).pipe(
      map((token: string) => {
        localStorage.setItem('jwt', token);
        this.userService.FetchUser();
        if(this.isAdmin()){
          this.router.navigateByUrl('/admin');
        }else{
          this.router.navigateByUrl('/');
        }
        return token;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  LogoutFunction() {
    localStorage.clear();
    this.cartservice.clearCart();
    this.generic.router.navigateByUrl('/');
  }

  isAuthunicated(): boolean {
    let token = localStorage.getItem('jwt');
    if(token === null || undefined) return false;

    return true;
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('jwt');
    let decodedtoken: any = jwtDecode.jwtDecode(token!)
    let role = decodedtoken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return role === 'Admin';
  }

}
