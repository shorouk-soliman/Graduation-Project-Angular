import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private general: GeneralService, private cartservice: CartService) { }

  public Sign(signData: any) {
    let SignURL = `${this.general.API}User/Signup`

    this.general.http.post(SignURL, signData, { responseType: 'text' }).subscribe((token: string) => {
      localStorage.setItem('jwt', token)
      this.cartservice.AddLocalCart();
      this.general.router.navigateByUrl('/');
      this.general.location.go(this.general.location.path());
    }, error => {

    })
  }



  public Login(loginData: any) {
    let loginURL = `${this.general.API}User/Login`

    this.general.http.post(loginURL, loginData, { responseType: 'text' }).subscribe((token: string) => {
      localStorage.setItem('jwt', token)
      this.general.router.navigateByUrl('/');
      this.general.location.go(this.general.location.path());
    }, error => {

    })
  }

  public LogoutFunction() {
    localStorage.clear();
    this.general.router.navigate(['']);
    this.cartservice.clearCart();
    this.general.location.go(this.general.location.path());
  }

  public isAuthunicated(): boolean {
    return this.general.IsLogged();
  }

}
