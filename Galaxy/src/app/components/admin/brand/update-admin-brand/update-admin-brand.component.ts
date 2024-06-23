import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-update-admin-brand',
  templateUrl: './update-admin-brand.component.html',
  styleUrls: ['./update-admin-brand.component.css']
})
export class UpdateAdminBrandComponent implements OnInit {
  notificationMessage: string | null = null;
  myForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null),
  });

  selectedFile: File | null = null;
  brandId: any;
  brand: any;

  constructor(
    private unit: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('id');
    this.GetBrand();
  }

  GetBrand(): void {
    this.unit.brand.GetOneBrand(this.brandId).subscribe(
      (res: any) => {
        this.brand = res;
        this.myForm.patchValue({
          Name: this.brand.name,
          image: this.brand.image
        });
      },
      (error) => {
        console.error('Error fetching brand:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  UpdateImageAndBrand(): void {
    if (!this.myForm.valid) return;

    const formDataImage: FormData = new FormData();

    if (this.selectedFile) {
      formDataImage.append('image', this.selectedFile);
    } else {
      formDataImage.append('image', this.brand.image);
    }

    formDataImage.append('Name', this.myForm.value.Name);
    if (this.myForm.value.Name !== this.brand.name) {
      this.unit.brand.GetAdminBrand().subscribe(
        (adminBrands: any) => {
          const exists = adminBrands.some((b: any) => b.name.toLowerCase() === this.myForm.value.Name.toLowerCase());
          if (exists) {
            this.notificationMessage = `Brand with name '${this.myForm.value.Name}' already exists.`;
          } else {
            this.UpdateBrandAndImage(formDataImage);
          }
        },
        (error) => {
          console.error('Error fetching admin brands:', error);
          this.notificationMessage = 'Failed to update brand. Please try again later.';
        }
      );
    } else {
      this.UpdateBrandAndImage(formDataImage);
    }
  }

  UpdateBrandAndImage(formDataImage: FormData): void {
    this.unit.image.ConvertImage(formDataImage).subscribe(
      (res: any) => {
        const updateData = { ...this.myForm.value, image: res };
        this.UpdateBrand(updateData);
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
          alert('Failed to update brand. Please try again later.');
        }
      }
    );
  }

  UpdateBrand(updateData: any): void {
    this.unit.brand.UpdateBrand(this.brandId, updateData).subscribe(
      () => {
        console.log("Brand edited successfully");
        this.router.navigateByUrl('/admin/brand');
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  confirmUpdateBrand(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to update this brand?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.UpdateImageAndBrand();
      }
    });
  }

  cancelUpdate(): void {
    this.myForm.patchValue({
      Name: this.brand.name,
      image: this.brand.image
    });
    this.router.navigateByUrl('/admin/brand');
  }

  NameError = () => this.myForm.get('Name')?.errors;
  ImageError = () => this.myForm.get('image')?.errors;
}
