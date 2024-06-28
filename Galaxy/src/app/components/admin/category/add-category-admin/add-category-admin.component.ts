import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
@Component({
  selector: 'app-add-category-admin',
  templateUrl: './add-category-admin.component.html',
  styleUrl: './add-category-admin.component.css'
})
export class AddCategoryAdminComponent {
  constructor(private unit: UnitService,private router:Router,public dialog: MatDialog  ) { }
  selectedFile: File | null = null;
  notificationMessage: string | null = null;

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    image: new FormControl(null, [Validators.required]),
  });;


  NameError = () => this.myForm.get('name')?.errors
  descriptionError = () => this.myForm.get('description')?.errors
  ImageError = () => this.myForm.get('image')?.errors

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddImageAndBrand() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, image: res }
      this.AddCategory(insert);
    });
  }

  AddCategory(insert: any) {
    this.unit.category.addCategory(insert).subscribe(() => {
      this.unit.category.getAdminCategories().subscribe(
        (adminCategories: any) => {
          const exists = adminCategories.some((cat: any) => cat.name.toLowerCase() === this.myForm.value.name.toLowerCase());
          if (exists) {
            this.notificationMessage = `Category with name '${this.myForm.value.name}' already exists.`;
          }})
    }, error => {
      this.notificationMessage = `${error.error}`    })
  }
  confirmCategory(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: {title:"Add Category", message: 'Are you sure you want to Add this category?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.AddImageAndBrand();
        this.router.navigateByUrl('/admin/category');
      }
      else{
        return;
      }
    });
  }
}
