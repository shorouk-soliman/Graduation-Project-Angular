import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-category-admin',
  templateUrl: './main-category-admin.component.html',
  styleUrl: './main-category-admin.component.css'
})
export class MainCategoryAdminComponent {
  constructor(private unit: UnitService) { }
  categories: any;


  ngOnInit(): void {
    this.GetCategory()
  }

  Deletecategory(category:any){
    this.unit.category.DeleteCategory(category.id).subscribe(()=>{
      category.isDeleted = true;
    },error=>{
      
    })
  }
  RetrieveCategory(category: any) {
    this.unit.category.RetrieveCategory(category.id).subscribe(() => {
      category.isDeleted = false;
    }, error => {
      console.error('Error retrieving brand', error);
    });
  }
  
  GetCategory():void{
    this.unit.category.GetAdminCategories().subscribe((category: any) => {
      this.categories = category;
    });
  }

}
