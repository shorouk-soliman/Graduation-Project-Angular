import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-category-admin',
  templateUrl: './main-category-admin.component.html',
  styleUrl: './main-category-admin.component.css'
})
export class MainCategoryAdminComponent {
  constructor(private unit: UnitService, private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }
  categories: any;


  ngOnInit(): void {
    this.GetCategories()
  }

  Deletecategory(category:any){
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to delete ${category.name}?`,
      title: 'Delete category'  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.category.deleteCategory(category.id).subscribe(()=>{
          category.isDeleted = true;
        },error=>{

        })
      }
    });
  }
  RetrieveCategory(category: any) {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to retrive ${category.name}?`,
      title: 'retrive category'  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.category.retrieveCategory(category.id).subscribe(() => {
          category.isDeleted = false;
        }, error => {
          console.error('Error retrieving brand', error);
        });
      }
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
