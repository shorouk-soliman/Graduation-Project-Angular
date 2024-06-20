import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin-subcategory',
  templateUrl: './add-admin-subcategory.component.html',
  styleUrl: './add-admin-subcategory.component.css'
})
export class AddAdminSubcategoryComponent implements OnInit{
  constructor(private unit: UnitService) { }
  selectedFile: File | null = null;
  categories:any;
  ngOnInit(): void {
    this.GetCategoies();
  }

  GetCategoies(){
    this.unit.category.getGeneralCategories().subscribe((res:any)=>{
      this.categories = res;
    })
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    image: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0, [Validators.required ,Validators.min(1)]),
  });;


  NameError = () => this.myForm.get('name')?.errors
  descriptionError = () => this.myForm.get('description')?.errors
  ImageError = () => this.myForm.get('image')?.errors
  categoryError = () => this.myForm.get('categoryId')?.errors

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddImageAndSubCategory() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, image: res }
      this.AddSubCategory(insert);
    });
  }

  AddSubCategory(insert: any) {
    this.unit.subcategory.AddSubCategory(insert).subscribe(() => {
      alert('Sub Category Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }
}
