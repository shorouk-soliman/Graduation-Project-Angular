import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-main-admin-subcategory',
  templateUrl: './main-admin-subcategory.component.html',
  styleUrl: './main-admin-subcategory.component.css'
})
export class MainAdminSubcategoryComponent {
  constructor(private unit: UnitService ,  private router: Router,
    public dialog: MatDialog) { }
  subcategories: any;


  ngOnInit(): void {
    this.GetSubCategory()
  }

  DeleteSubcategory(subcategory:any){
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to delete ${subcategory.name}?`,
      title: 'Delete SubCategory'  }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.unit.subcategory.DeleteSubCategory(subcategory.id).subscribe(()=>{
          subcategory.isDeleted = true;
        })
      }
    });

  }
  RetriveSubCategory(subcategory:any){
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to retrive ${subcategory.name}?`,
      title: 'retrive SubCategory'  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.subcategory.RetriveSubCategory(subcategory.id).subscribe(()=>{
          subcategory.isDeleted = false;
        })
      }
    });

  }
  GetSubCategory():void{
    setTimeout(() => {
      
      this.unit.subcategory.GetAdminSubCategories().subscribe((subcategory: any) => {
        console.log('after subcategory',subcategory)
        this.subcategories = subcategory.sort((a: any, b:any) => b.id -a.id);
      }, (error: any) => {
        console.error('Error fetching categories', error);
      });
    }, 400);

    }


  UpdateSubcategory(subcategory: any, updatedData: any): void {
    this.unit.subcategory.updateSubcategory(subcategory.id, updatedData).subscribe(() => {
      this.GetSubCategory(); // Refresh the list after update
    }, error => {
      console.error('Error updating subcategory:', error);
    });
  }


}
