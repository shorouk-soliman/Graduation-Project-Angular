import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { IUserRead, initUserRead } from '../Models/User/user-read';
import { IUserUpdate } from '../Models/User/user-update';
import { IUserPasswordUpdate } from '../Models/User/user-password-update';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private generic: GenericService) { }

  private UserSubject: BehaviorSubject<IUserRead> = new BehaviorSubject<IUserRead>(initUserRead);


  FetchUser(): void {
    let Url: string = `User/GetUserDetails`;
    this.generic.getRequest<IUserRead>(Url).subscribe((user: IUserRead) => {
      this.UserSubject.next(user);
    });
  };

  GetUser(): Observable<IUserRead> {
    return this.UserSubject.asObservable();
  };

  UpdateUser(update: IUserUpdate): Observable<any> {
    let Url: string = `User/UpdateUser`
    return this.generic.putRequest<IUserUpdate>(Url, update);
  };

  UpdateImage(image: FormData): Observable<any> {
    let Url: string = `User/UpdateImage`
    return this.generic.putRequest<FormData>(Url, image);
  };

  UpdatePassword(password: IUserPasswordUpdate): Observable<any> {
    let Url: string = `User/UpdatePassword`
    return this.generic.putRequest<IUserPasswordUpdate>(Url, password);
  };

};