import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EAVService {

  constructor(private general: GeneralService) { }

  GetProductIdbyValues(groupId:number, valuesIds:number[]):Observable<any>{
    const GetProductIdByEAVURL = `${this.general.API}EAV/GetProductIdbyValues`;
    let formData = new FormData();
    formData.append('groupId',groupId.toString());
    valuesIds.forEach((valueId) => {
      formData.append('values',valueId.toString());
    });
   return this.general.http.post(GetProductIdByEAVURL,formData);
  }
}
