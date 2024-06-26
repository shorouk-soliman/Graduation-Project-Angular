import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-update-subcategory-admin',
  templateUrl: './update-admin-subcategory.component.html',
  styleUrls: ['./update-admin-subcategory.component.css']
})
export class UpdateSubcategoryAdminComponent implements OnInit {
  notificationMessage: string | null = null;
  subcategoryForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null),
  });
  selectedFile: File | null = null;
  subcategoryId: any;
  subcategory: any;

  constructor(
    private unit: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subcategoryId = this.route.snapshot.paramMap.get('id');
    this.getSubcategory();
  }

  getSubcategory(): void {
    this.unit.subcategory.GetOneSubCategory(this.subcategoryId).subscribe(
      (res: any) => {
        this.subcategory = res.subcategory;
        this.subcategoryForm.patchValue({
          Name: this.subcategory.name,
          image:this.subcategory.image
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

  UpdateImageAndSubcategory(): void {
    if (!this.subcategoryForm.valid) return;

    const formDataImage: FormData = new FormData();

    if (this.selectedFile) {
      formDataImage.append('image', this.selectedFile);
    } else {
      formDataImage.append('image', this.subcategory.image);
    }

    formDataImage.append('Name', this.subcategoryForm.value.Name);
    if (this.subcategoryForm.value.Name !== this.subcategory.name) {
      this.unit.subcategory.GetAdminSubCategories().subscribe(
        (adminSubcategories: any) => {
          const exists = adminSubcategories.some((b: any) => b.name.toLowerCase() === this.subcategoryForm.value.Name.toLowerCase());
          if (exists) {
            this.notificationMessage = `Subcategory with name '${this.subcategoryForm.value.Name}' already exists.`;
          } else {
            this.UpdateSubcategoryAndImage(formDataImage);
          }
        },
        (error: any) => {
          console.error('Error fetching admin Subcategories:', error);
          this.notificationMessage = 'Failed to update Subcategory. Please try again later.';
        }
      );
    } else {
      this.UpdateSubcategoryAndImage(formDataImage);
    }
  }

  UpdateSubcategoryAndImage(formDataImage: FormData): void {
    this.unit.image.ConvertImage(formDataImage).subscribe(
      (res: any) => {
        const updateData = { ...this.subcategoryForm.value, image: res };
        this.Updatesubcategory(updateData);
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

  Updatesubcategory(updateData: any): void {
    this.unit.category.updateSubcategory(this.subcategoryId,updateData).subscribe(
      () => {
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
        this.UpdateImageAndSubcategory();
      }
    });
  }

  cancelUpdate(): void {
    this.subcategoryForm.patchValue({
      Name: this.subcategory.name,
      image: this.subcategory.image
    });
    this.router.navigateByUrl('/admin/subcategory');
  }

  getNameErrors = () => this.subcategoryForm.get('Name')?.errors;
  getImageErrors = () => this.subcategoryForm.get('image')?.errors;
}
