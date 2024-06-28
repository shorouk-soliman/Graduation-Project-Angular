import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { ICategoryAdmin } from '../../../../Models/Category/category-admin';


@Component({
  selector: 'app-update-subcategory-admin',
  templateUrl: './update-admin-subcategory.component.html',
  styleUrls: ['./update-admin-subcategory.component.css']
})
export class UpdateSubcategoryAdminComponent implements OnInit {
  notificationMessage: string | null = null;

  subcategoryForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    categoryId: new FormControl(0),
  });

  selectedFile: File | null = null;
  subcategoryId: any;
  subcategory: any;
  categories: ICategoryAdmin[] = [];

  constructor(
    private unit: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subcategoryId = this.route.snapshot.paramMap.get('id');
    this.getSubcategory();
    this.GetAllCategories();
  }

  GetAllCategories():void{
    this.unit.category.getAdminCategories().subscribe((categories:ICategoryAdmin[])=>{
      this.categories = categories;
      console.log('categoriescategories',categories)
    });
  }


  getSubcategory(): void {
    this.unit.subcategory.GetOneSubCategory(this.subcategoryId).subscribe(
      (res: any) => {
        console.log('res res',res)
        this.subcategory = res.subcategory;
        this.subcategoryForm.patchValue({
          Name: this.subcategory.name,
          description: this.subcategory.description,
          categoryId: this.subcategory.categoryId,
        });
      },
      (error: any) => {
        console.error('Error fetching subcategory:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  Update(): void {
    if (!this.subcategoryForm.valid) return;

    if(this.selectedFile === null){
      let updatedFormValue = {...this.subcategoryForm.value , image: this.subcategory.image}
      this.UpdatesubcategoryOnly(updatedFormValue);
    }else{
      this.UpdateSubcategoryWithImage();
    }
  }


  UpdateSubcategoryWithImage(): void {

    let formdataImage:FormData = new FormData();
    formdataImage.append('image',this.selectedFile!);

    this.unit.image.ConvertImage(formdataImage).subscribe((res: any) => {
        const updateData = { ...this.subcategoryForm.value, image: res };
        this.UpdatesubcategoryOnly(updateData);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          if (error.error && error.error.errors && error.error.errors.image) {
            alert(error.error.errors.image[0]);
          } else {
            alert('Unexpected error occurred.');
          }
        } else {
          console.error('Error converting image:', error);
          alert('Failed to update Subcategory. Please try again later.');
        }
      }
    );
  }

  UpdatesubcategoryOnly(data:any): void {
    this.unit.subcategory.updateSubcategory(this.subcategoryId, data).subscribe(() => {
        console.log("Subcategory edited successfully");
        this.router.navigateByUrl('/admin/subcategory');
      },
      (error: any) => {
        console.error('Error updating subcategory:', error);
        this.notificationMessage = 'Failed to update Subcategory. Please try again later.';
      }
    );
  }

  confirmUpdateSubcategory(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to update this subcategory?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Update();
      }
    });
  }

  cancelUpdate(): void {
    this.router.navigateByUrl('/admin/subcategory');
  }

  getNameErrors = () => this.subcategoryForm.get('Name')?.errors;
  getdescriptionErrors = () => this.subcategoryForm.get('description')?.errors;
  getImageErrors = () => this.subcategoryForm.get('image')?.errors;
}
