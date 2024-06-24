import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CartService } from './cart.service';
import { ISign } from '../Models/Auth/sign-model';
import { ILogin } from '../Models/Auth/login-model';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private generic: GenericService, private cartservice: CartService, private userService: UserService) { }

  Sign(signData: ISign): Observable<string> {
    const signUrl: string = `User/Signup`;

    return this.generic.postRequest<ISign>(signUrl, signData, { responseType: 'text' }).pipe(
      map((token: string) => {
        localStorage.setItem('jwt', token);
        this.cartservice.AddLocalCart();
        this.userService.FetchUser();
        this.generic.router.navigateByUrl('/');
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
        this.generic.router.navigateByUrl('/');
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
    return this.generic.IsLogged();
  }
}
