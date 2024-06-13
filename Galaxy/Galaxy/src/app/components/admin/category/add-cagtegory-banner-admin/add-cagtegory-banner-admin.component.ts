import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-cagtegory-banner-admin',
  templateUrl: './add-cagtegory-banner-admin.component.html',
  styleUrl: './add-cagtegory-banner-admin.component.css'
})
export class AddCagtegoryBannerAdminComponent {
  constructor(private unit: UnitService) { }
  selectedFile: File | null = null;
  categories:any;
  subcategories:any;
  ngOnInit(): void {
    this.GetCategoies();
  }

  GetCategoies(){
    this.unit.category.GetGeneralCategories().subscribe((res:any)=>{
      this.categories = res;
    })
  }

  
  onCategoryChange(event:any){
    let categoryId = event.target.value;
    this.unit.subcategory.GetSubCategoriesbyCategoryId(categoryId).subscribe((res:any)=>{
      this.subcategories = res;
    })
  }

  myForm: FormGroup = new FormGroup({
    image: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0, [Validators.required ,Validators.min(1)]),
    subcategoryId: new FormControl(0, [Validators.required ,Validators.min(1)]),
  });;


  ImageError = () => this.myForm.get('image')?.errors
  categoryError = () => this.myForm.get('categoryId')?.errors
  subcategoryError = () => this.myForm.get('subcategoryId')?.errors

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddBanners() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    this.unit.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, imageURL: res }
      this.Addbanner(insert);
    });
  }

  Addbanner(insert: any) {
    this.unit.category.AddCategoryBanner(insert).subscribe(() => {
      alert('Category banner Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }
}
