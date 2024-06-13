import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-admin-group',
  templateUrl: './main-admin-group.component.html',
  styleUrl: './main-admin-group.component.css'
})
export class MainAdminGroupComponent {
  constructor(private unit: UnitService) { }
  groups: any;


  ngOnInit(): void {
    this.GetAllgroups()
  }

  Deletecategory(category:any){
    this.unit.category.DeleteCategory(category.id).subscribe(()=>{
      category.isDeleted = true;
    },error=>{
      
    })
  }
  Retrivecategory(category:any){
    this.unit.category.RetriveCategory(category.id).subscribe(()=>{
      category.isDeleted = false;
    },error=>{
      
    })
  }

  
  GetAllgroups():void{
    this.unit.group.GetAllGroups().subscribe((group: any) => {
      this.groups = group;
    });
  }

}
