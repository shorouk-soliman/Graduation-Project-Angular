import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-admin-subcategory',
  templateUrl: './main-admin-subcategory.component.html',
  styleUrl: './main-admin-subcategory.component.css'
})
export class MainAdminSubcategoryComponent {
  constructor(private unit: UnitService) { }
  subcategories: any;


  ngOnInit(): void {
    this.GetSubCategory()
  }

  Deletecategory(subcategory:any){
    this.unit.category.DeleteCategory(subcategory.id).subscribe(()=>{
      subcategory.isDeleted = true;
    },error=>{
      
    })
  }
  Retrivecategory(subcategory:any){
    this.unit.category.RetriveCategory(subcategory.id).subscribe(()=>{
      subcategory.isDeleted = false;
    },error=>{
      
    })
  }
  GetSubCategory():void{
    this.unit.subcategory.GetAdminSubCategories().subscribe((subcategory: any) => {
      this.subcategories = subcategory;
    });
  }

}
