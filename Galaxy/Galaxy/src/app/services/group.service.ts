import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private general:GeneralService) { }

  GetAllGroups():Observable<any>{
    const GetGroupsURL = `${this.general.API}VariantGroup/GetAll`
    return this.general.http.get(GetGroupsURL);
  }

  GetProductsbyGroup(GroupId:number):Observable<any>{
    const GetGroupsURL = `${this.general.API}VariantGroup/GetOne?Id=${GroupId}`
    return this.general.http.get(GetGroupsURL);
  }

  AddGroups(insert:any):Observable<any>{
    const AddGroupsURL = `${this.general.API}VariantGroup/Add`
    return this.general.http.post(AddGroupsURL,insert);
  }

  GetGroupWithAttributesValues(GroupId:number){
    const GetGroupsURL = `${this.general.API}VariantGroup/GetAttributeValuesByGroup?Id=${GroupId}`
    return this.general.http.get(GetGroupsURL);
  }

}
