import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-admin-values',
  templateUrl: './add-admin-values.component.html',
  styleUrl: './add-admin-values.component.css'
})
export class AddAdminValuesComponent implements OnInit{
  constructor(private unit: UnitService) { }

  attributes:any;

  ngOnInit(): void {
    this.GetAttributes();
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    attributeId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });;


  NameError = () => this.myForm.get('name')?.errors
  attributeError = () => this.myForm.get('attributeId')?.errors

  AddValues() {
    if (!this.myForm.valid) return;

    this.unit.values.AddValues(this.myForm.value).subscribe(() => {
      alert('Values Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }

  GetAttributes():void{
    this.unit.attribute.GetAttributes().subscribe((res:any)=>{
      this.attributes = res;
    })
  }

}
