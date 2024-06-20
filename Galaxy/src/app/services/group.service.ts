import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { IGroupAttributeValues } from '../Models/Group/group-attrbuite-values';
import { IGroupRead } from '../Models/Group/group-read';
import { IAddGroup } from '../Models/Group/group-add';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private generic: GenericService) { }

  GetAllGroups(): Observable<IGroupRead[]> {
    let Url:string  = `VariantGroup/GetAll`;
    return this.generic.getRequest<IGroupRead[]>(Url);
  };

  // GetProductsbyGroup(GroupId: number): Observable<IGroupRead[]> {
  //   let Url = `VariantGroup/GetOne?Id=${GroupId}`;
  //   return this.generic.getRequest<IGroupRead[]>(Url);
  // };

  GetGroupWithAttributesValues(GroupId: number):Observable<IGroupAttributeValues> {
    let Url:string  = `VariantGroup/GetAttributeValuesByGroup?Id=${GroupId}`;
    return this.generic.getRequest<IGroupAttributeValues>(Url);
  };

  AddGroups(insert: IAddGroup): Observable<any> {
    let Url:string  = `VariantGroup/Add`;
    return this.generic.postRequest<any>(Url, insert);
  };


};