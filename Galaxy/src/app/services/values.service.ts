import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private general:GeneralService) { }

  GetValues(){
    let GetValuesURL = `${this.general.API}Values/GetAllValues`;
    return this.general.http.get(GetValuesURL);
  }

  AddValues(value: any): Observable<any> {
    let AddvaluesURL = `${this.general.API}Values/AddValue`;
    return this.general.http.post(AddvaluesURL, value);
  }

  DeleteValues(valuesId: any): Observable<any> {
    let DeleteValuesURL = `${this.general.API}Values/deleteValues?valueId=${valuesId}`;
    return this.general.http.delete(DeleteValuesURL);
  }
}
