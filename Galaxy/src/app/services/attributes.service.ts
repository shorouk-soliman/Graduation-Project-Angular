import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { IAttributeRead } from '../Models/Attribute/Attribute-Read-model';

@Injectable({
  providedIn: 'root'
})

export class AttributesService {

  constructor(private generic: GenericService) { }

  GetAttributes(): Observable<IAttributeRead[]> {
    let Url:string = `Attribute/GetAll`;
    return this.generic.getRequest<IAttributeRead[]>(Url);
  }

  AddAttribute(attribute: IAttributeRead): Observable<any> {
    let Url:string = `Attribute/AddAttribute`;
    return this.generic.postRequest<any>(Url, attribute);
  }

  DeleteAttribute(attributeId: string): Observable<any> {
    let Url:string = `Attribute/DeleteAttribute?Id=${attributeId}`;
    return this.generic.deleteRequest(Url);
  }

}
