import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-admin-brand',
  templateUrl: './add-admin-brand.component.html',
  styleUrl: './add-admin-brand.component.css'
})
export class AddAdminBrandComponent {

  constructor(private unit: UnitService) { }
  selectedFile: File | null = null;


  myForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null, [Validators.required]),
  });;


  NameError = () => this.myForm.get('Name')?.errors
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
      this.AddBrand(insert);
    });

  }

  AddBrand(insert: any) {
    this.unit.brand.AddBrand(insert).subscribe(() => {
      alert('Brand Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }

}
