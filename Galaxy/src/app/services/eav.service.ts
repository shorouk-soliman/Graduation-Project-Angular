import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EAVService {

  constructor(private generic: GenericService) { }

  GetProductIdbyValues(groupId: number, values: number[]): Observable<any> {
    let Url:string  = `EAV/GetProductIdbyValues?groupId=${groupId}`;
    return this.generic.postRequest<any>(Url, values);
  };
  
};