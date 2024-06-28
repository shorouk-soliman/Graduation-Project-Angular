import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin-product-simple',
  templateUrl: './add-admin-product-simple.component.html',
  styleUrls: ['./add-admin-product-simple.component.css']
})
export class AddAdminProductSimpleComponent {
  constructor(private unit: UnitService , public dialog: MatDialog, private router: Router) {}

  selectedFile: File | null = null;
  selectedFilesList: File[] = [];
  subcategories: any;
  brands: any;

  ngOnInit(): void {
    this.GetCategoies();
    this.GetBrands();
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    image: new FormControl(null, [Validators.required]),
    discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    subCategoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1),Validators.max(30), Validators.pattern("^[0-9]*$")]),
    brandId: new FormControl(0, [Validators.required, Validators.min(1)]),
    productImages: new FormControl([], [Validators.required]),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  NameError = () => this.myForm.get('name')?.errors;
  descriptionError = () => this.myForm.get('description')?.errors;
  ImageError = () => this.myForm.get('image')?.errors;
  discountError = () => this.myForm.get('discount')?.errors;
  subCategoryError = () => this.myForm.get('subCategoryId')?.errors;
  quantityError = () => this.myForm.get('quantity')?.errors;
  brandError = () => this.myForm.get('brandId')?.errors;
  productImagesError = () => this.myForm.get('productImages')?.errors;
  priceError = () => this.myForm.get('price')?.errors;

  GetCategoies(): void {
    this.unit.subcategory.GetAdminSubCategories().subscribe((res: any) => {
      this.subcategories = res;
    });
  }

  GetBrands(): void {
    this.unit.brand.GetAdminBrand().subscribe((res: any) => {
      this.brands = res;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFilesListSelected(event: any): void {
    this.selectedFilesList = Array.from(event.target.files);
  }

  AddImagesAndProduct(): void {
    if (!this.myForm.valid) return;

    const formDataImage: FormData = new FormData();
    const formDataImages: FormData = new FormData();

    if (this.selectedFile) formDataImage.append('image', this.selectedFile);

    if (this.selectedFilesList.length > 0) {
      this.selectedFilesList.forEach((file: File) => {
        formDataImages.append('images', file);
      });
    }

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      const insert = { ...this.myForm.value, image: res };

      this.unit.image.ConvertListImage(formDataImages).subscribe((sres: any) => {
        const finalInsert = { ...insert, productImages: sres };
        this.AddSimpleProduct(finalInsert);
      });
    });
  }
  confirmAddProduct(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to add this product?',title : 'Add product' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.AddImagesAndProduct();
      }
      else{
        return;
      }
    });
  }
  AddSimpleProduct(insert: any): void {
    this.unit.product.AddSimpleProduct(insert).subscribe(
      () => {
        this.router.navigateByUrl('/admin/product');
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}
