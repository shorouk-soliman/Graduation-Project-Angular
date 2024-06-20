import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { IValueRead } from '../Models/Values/values-read-model';
import { IAddValue } from '../Models/Values/values-add';

@Injectable({
  providedIn: 'root'
})

export class ValuesService {

  constructor(private generic: GenericService) { }

  GetValues(): Observable<IValueRead[]> {
    let Url: string = `Values/GetAllValues`;
    return this.generic.getRequest<IValueRead[]>(Url);
  };

  AddValues(value: IAddValue): Observable<any> {
    let Url: string = `Values/AddValue`;
    return this.generic.postRequest<IAddValue>(Url, value);
  };

  DeleteValues(valuesId: string | null): Observable<any> {
    let Url: string = `Values/deleteValues?valueId=${valuesId}`;
    return this.generic.deleteRequest<any>(Url);
  };

};