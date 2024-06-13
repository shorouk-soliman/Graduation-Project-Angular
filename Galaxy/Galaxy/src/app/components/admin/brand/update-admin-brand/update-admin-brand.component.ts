import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-admin-brand',
  templateUrl: './update-admin-brand.component.html',
  styleUrl: './update-admin-brand.component.css'
})
export class UpdateAdminBrandComponent implements OnInit {

  constructor(
    private unit: UnitService,
    private route:ActivatedRoute,
  ) { }

  myForm:FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null, [Validators.required]),
  });;

  selectedFile: File | null = null;
  brandId:any;
  brand:any;

  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('id');
    this.GetBrand();
  }

  GetBrand(){
    this.unit.brand.GetOneBrand(this.brandId).subscribe((res:any)=>{
      this.brand = res;
    })
  }


  NameError = () => this.myForm.get('Name')?.errors
  ImageError = () => this.myForm.get('image')?.errors

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  UpdateImageAndBrand() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    this.unit.ConvertImage(formDataImage).subscribe((res: string) => {
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
