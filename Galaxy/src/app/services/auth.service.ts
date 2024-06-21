import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CartService } from './cart.service';
import { ISign } from '../Models/Auth/sign-model';
import { ILogin } from '../Models/Auth/login-model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private generic: GenericService, private cartservice: CartService, private userService: UserService) { }

  Sign(signData: ISign): void {
    let SignUrl: string = `User/Signup`;

    this.generic.postRequest<ISign>(SignUrl, signData, { responseType: 'text' })
      .subscribe((token: string) => {
        localStorage.setItem('jwt', token);
        this.cartservice.AddLocalCart();
        this.userService.FetchUser();
        this.generic.router.navigateByUrl('/');
      });
  }

  Login(loginData: ILogin): Observable<string> {
    let loginUrl = `User/Login`;
    return this.generic.postRequest<ILogin>(loginUrl, loginData, { responseType: 'text' });
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
