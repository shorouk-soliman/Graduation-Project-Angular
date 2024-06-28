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
    this.GetCategories()
  }

  Deletecategory(category:any){
    this.unit.category.deleteCategory(category.id).subscribe(()=>{
      category.isDeleted = true;
    },error=>{

    })
  }
  RetrieveCategory(category: any) {
    this.unit.category.retrieveCategory(category.id).subscribe(() => {
      category.isDeleted = false;
    }, error => {
      console.error('Error retrieving brand', error);
    });
  }

  GetCategories(): void {
    this.categories = this.unit.category.getAdminCategories().subscribe((categories: any) => {
      this.categories = categories.sort((a: any, b: any) => b.id - a.id);
    }, (error: any) => {
      console.error('Error fetching categories', error);
    });
  }

}
