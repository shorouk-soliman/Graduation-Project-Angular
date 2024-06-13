import { Injectable } from '@angular/core';
import { UnitService } from './unit.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private general:GeneralService) { }

  private UserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  GetProfile():Observable<any>{
    let getInfoUrl = `${this.general.API}User/GetUserDetails`
   return this.general.http.get(getInfoUrl);
  }

  FetchUser():void{
    const GetUserURL = `${this.general.API}User/GetUserDetails`;
    this.general.http.get(GetUserURL).subscribe((user:any)=>{
      this.UserSubject.next(user);
    })
  }

  GetUser():Observable<any>{
    return this.UserSubject.asObservable();
  }


  UpdateUser(update:any):Observable<any>{
    let UpdateUserUrl = `${this.general.API}User/UpdateUser`
   return this.general.http.put(UpdateUserUrl,update);
  }

  UpdateImage(image:any):Observable<any>{
    let UpdateImageUrl = `${this.general.API}User/UpdateImage`
   return this.general.http.put(UpdateImageUrl,image);
  }

  UpdatePassword(password:any):Observable<any>{
    let UpdatepasswordUrl = `${this.general.API}User/UpdatePassword`
   return this.general.http.put(UpdatepasswordUrl,password);
  }

}
