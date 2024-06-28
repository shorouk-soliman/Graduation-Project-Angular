import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subcagtegory-banner-admin',
  templateUrl: './add-subcagtegory-banner-admin.component.html',
  styleUrl: './add-subcagtegory-banner-admin.component.css'
})
export class AddSubcagtegoryBannerAdminComponent implements OnInit {
  constructor(private unit: UnitService, private router:Router) { }
  selectedFile: File | null = null;
  subcategories:any;
  ngOnInit(): void {
    this.GetSubCategoies();
  }

  GetSubCategoies(){
    this.unit.subcategory.GetAdminSubCategories().subscribe((res:any)=>{
      this.subcategories = res;
    })
  }


  onCategoryChange(event:any){
    let categoryId = event.target.value;
    this.unit.subcategory.GetSubCategoriesbyCategoryId(categoryId).subscribe((res:any)=>{
      this.subcategories = res;
    })
  }

  myForm: FormGroup = new FormGroup({
    imageURL: new FormControl(null, [Validators.required]),
    productId: new FormControl(0, [Validators.required, Validators.min(1)]),
    subcategoryId: new FormControl(0, [Validators.required ,Validators.min(1)]),
  });;


  ImageError = () => this.myForm.get('imageURL')?.errors
  productError = () => this.myForm.get('productId')?.errors
  subcategoryError = () => this.myForm.get('subcategoryId')?.errors

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddBanners() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, imageURL: res }
      this.Addbanner(insert);
    });
  }

  Addbanner(insert: any) {
    this.unit.subcategory.AddSubCategoryBanner(insert).subscribe(() => {
      // alert('Category banner Added Succssefully')
      this.router.navigateByUrl('/admin/subcategory');

    }, error => {
      alert(error.error)
    })
  }
}
