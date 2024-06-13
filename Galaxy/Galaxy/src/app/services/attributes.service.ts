import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private general: GeneralService) { }

  GetAttributes(): Observable<any> {
    let GetAttributesURL = `${this.general.API}Attribute/GetAll`;
    return this.general.http.get(GetAttributesURL);
  }

  AddAttribute(attribute: any): Observable<any> {
    let AddAttributesURL = `${this.general.API}Attribute/AddAttribute`;
    return this.general.http.post(AddAttributesURL, attribute);
  }

  DeleteAttribute(attributeId: any): Observable<any> {
    let AddAttributesURL = `${this.general.API}Attribute/DeleteAttribute?Id=${attributeId}`;
    return this.general.http.delete(AddAttributesURL);
  }


}
