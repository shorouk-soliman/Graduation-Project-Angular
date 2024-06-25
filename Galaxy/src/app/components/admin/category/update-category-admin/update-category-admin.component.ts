import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { HttpErrorResponse } from '@angular/common/http'; 
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-update-category-admin',
  templateUrl: './update-category-admin.component.html',
  styleUrls: ['./update-category-admin.component.css']
})
export class UpdateCategoryAdminComponent implements OnInit {
  notificationMessage: string | null = null;
  categoryForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null),
  });
  selectedFile: File | null = null;
  categoryId: any;
  category: any;

  constructor(
    private unit: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.getCategory();
  }

  getCategory(): void {
    this.unit.category.GetOneCategory(this.categoryId).subscribe(
      (res: any) => {
        this.categoryForm = res;
        this.categoryForm.patchValue({
          Name: this.category.name,
          image: this.category.image
        });
      },
      (error: any) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  UpdateImageAndCategory(): void {
    if (!this.categoryForm.valid) return;

    const formDataImage: FormData = new FormData();

    if (this.selectedFile) {
      formDataImage.append('image', this.selectedFile);
    } else {
      formDataImage.append('image', this.category.image);
    }

    formDataImage.append('Name', this.categoryForm.value.Name);
    if (this.categoryForm.value.Name !== this.category.name) {
      this.unit.category.GetAdminCategories().subscribe(
        (adminCategories: any) => {
          const exists = adminCategories.some((b: any) => b.name.toLowerCase() === this.categoryForm.value.Name.toLowerCase());
          if (exists) {
            this.notificationMessage = `Category with name '${this.categoryForm.value.Name}' already exists.`;
          } else {
            this.UpdateCategoryAndImage(formDataImage);
          }
        },
        (error:any) => {
          console.error('Error fetching admin Categories:', error);
          this.notificationMessage = 'Failed to update Category. Please try again later.';
        }
      );
    } else {
      this.UpdateCategoryAndImage(formDataImage);
    }
  }

  UpdateCategoryAndImage(formDataImage: FormData): void {
    this.unit.image.ConvertImage(formDataImage).subscribe(
      (res: any) => {
        const updateData = { ...this.categoryForm.value, image: res };
        this.UpdateCategory(updateData);
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
          alert('Failed to update Category. Please try again later.');
        }
      }
    );
  }

  UpdateCategory(updateData: any): void {
    this.unit.category.UpdateCategory(this.categoryId, updateData).subscribe(
      () => {
        console.log("Category edited successfully");
        this.router.navigateByUrl('/admin/category');
      }
    );
  }

  confirmUpdateCategory(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to update this category?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.UpdateImageAndCategory();
      }
    });
  }

  cancelUpdate(): void {
    this.categoryForm.patchValue({
      Name: this.category.name,
      image: this.category.image
    });
    this.router.navigateByUrl('/admin/category');
  }

  getNameErrors = () => this.categoryForm.get('Name')?.errors;
  getImageErrors = () => this.categoryForm.get('image')?.errors;
}
