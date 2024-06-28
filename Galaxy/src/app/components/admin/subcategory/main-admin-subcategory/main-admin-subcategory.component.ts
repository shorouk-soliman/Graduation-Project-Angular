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

  DeleteSubcategory(subcategory:any){
    this.unit.subcategory.DeleteSubCategory(subcategory.id).subscribe(()=>{
      subcategory.isDeleted = true;
    })
  }
  RetriveSubCategory(subcategory:any){
    this.unit.subcategory.RetriveSubCategory(subcategory.id).subscribe(()=>{
      subcategory.isDeleted = false;
    })
  }
  GetSubCategory():void{
    this.subcategories=this.unit.subcategory.GetAdminSubCategories().subscribe((subcategory: any) => {
      this.subcategories = subcategory.sort((a: any, b:any) => b.id -a.id);
    }, (error: any) => {
          console.error('Error fetching categories', error);
        });

    }


  UpdateSubcategory(subcategory: any, updatedData: any): void {
    this.unit.subcategory.updateSubcategory(subcategory.id, updatedData).subscribe(() => {
      this.GetSubCategory(); // Refresh the list after update
    }, error => {
      console.error('Error updating subcategory:', error);
    });
  }
 

}
