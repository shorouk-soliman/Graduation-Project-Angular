import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-category-admin',
  templateUrl: './add-category-admin.component.html',
  styleUrl: './add-category-admin.component.css'
})
export class AddCategoryAdminComponent {
  constructor(private unit: UnitService) { }
  selectedFile: File | null = null;


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
    this.unit.category.AddCategory(insert).subscribe(() => {
      alert('category Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }
}
