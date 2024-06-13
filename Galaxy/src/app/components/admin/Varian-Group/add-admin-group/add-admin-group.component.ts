import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-admin-group',
  templateUrl: './add-admin-group.component.html',
  styleUrl: './add-admin-group.component.css'
})
export class AddAdminGroupComponent implements OnInit{
  constructor(private unit: UnitService) { }
  attributes:any;

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    attributesIds: new FormControl(0, [Validators.required,Validators.min(1)]),
  });;

ngOnInit(): void {
  this.GetAttributes();
}
  NameError = () => this.myForm.get('name')?.errors
  attributesError = () => this.myForm.get('attributesIds')?.errors

  GetAttributes():void{
    this.unit.attribute.GetAttributes().subscribe((res:any)=>{
      this.attributes = res;
    })
  }


  AddGroup() {
    this.unit.group.AddGroups(this.myForm.value).subscribe(() => {
      alert('group Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }
}
