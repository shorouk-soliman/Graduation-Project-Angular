import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-update-category-admin',
  templateUrl: './update-category-admin.component.html',
  styleUrls: ['./update-category-admin.component.css']
})
export class UpdateCategoryAdminComponent implements OnInit {
  notificationMessage: string | null = null;
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
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
    this.unit.category.getOneCategory(this.categoryId).subscribe(
      (res: any) => {
        this.category = res.category;
        this.categoryForm.patchValue({
          name: this.category.name,
          description: this.category.description,
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

    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.category.image);
    }

    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description);

    if (this.categoryForm.value.name !== this.category.name) {
      this.unit.category.getAdminCategories().subscribe(
        (adminCategories: any[]) => {
          const exists = adminCategories.some((cat: any) => cat.name.toLowerCase() === this.categoryForm.value.name.toLowerCase());
          if (exists) {
            this.notificationMessage = `Category with name '${this.categoryForm.value.name}' already exists.`;
          } else {
            this.UpdateCategoryAndImage(formData);
          }
        },
        (error: any) => {
          console.error('Error fetching admin Categories:', error);
          this.notificationMessage = 'Failed to update Category. Please try again later.';
        }
      );
    } else {
      this.UpdateCategoryAndImage(formData);
    }
  }

  UpdateCategoryAndImage(formData: FormData): void {
    this.unit.image.ConvertImage(formData).subscribe(
      (res: any) => {
        const updateData = { ...this.categoryForm.value, image: res };
        this.UpdateCategory(updateData);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          if (error.error && error.error.errors && error.error.errors.image) {
            alert(error.error.errors.image[0]);
          } else {
            this.notificationMessage = 'Update canceled.';
            setTimeout(() => {
              this.notificationMessage = null;
            }, 3000); }// Hide the notification after 3 seconds      }
        } else {
          console.error('Error converting image:', error);
          alert('Failed to update category. Please try again later.');
        }
      }
    );
  }

  UpdateCategory(updateData: any): void {
    this.unit.category.updateCategory(this.categoryId, updateData).subscribe(
      () => {
        console.log("Category updated successfully:");
        this.router.navigateByUrl('/admin/category');
      },
      (error) => {
        console.error('Error updating category:', error);
        this.notificationMessage = 'Failed to update category. Please try again later.';
      }
    );
  }

  confirmUpdateCategory(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { title: "Update Category", message: 'Are you sure you want to update this category?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.categoryForm.invalid) {
          this.notificationMessage = 'Invalid form data. Please check the inputs.';
          setTimeout(() => {
            this.notificationMessage = null;
          }, 3000); // Hide the notification after 3 seconds
        } else {
          this.UpdateImageAndCategory();
        }
      } else {
        this.notificationMessage = 'Failed to update category. Please try again later.';
        setTimeout(() => {
          this.notificationMessage = null;
        }, 3000); // Hide the notification after 3 seconds
      }
    });
  }

  cancelUpdate(): void {
    this.categoryForm.patchValue({
      name: this.category.name,
      description: this.category.description,
      image: this.category.image
    });

    this.notificationMessage = 'Update canceled.';

    // Clear any existing notifications after 3 seconds
    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

  getNameErrors() {
    return this.categoryForm.get('name')?.errors;
  }

  getDescriptionErrors() {
    return this.categoryForm.get('description')?.errors;
  }

  getImageErrors() {
    return this.categoryForm.get('image')?.errors;
  }
}
