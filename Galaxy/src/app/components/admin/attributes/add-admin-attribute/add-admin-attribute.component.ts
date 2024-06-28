import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin-attribute',
  templateUrl: './add-admin-attribute.component.html',
  styleUrl: './add-admin-attribute.component.css'
})
export class AddAdminAttributeComponent {
  constructor(private unit: UnitService,private router: Router) { }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
  });;


  NameError = () => this.myForm.get('name')?.errors

  AddAttribute() {
    if (!this.myForm.valid) return;

    this.unit.attribute.AddAttribute(this.myForm.value).subscribe(() => {
      alert('attribute Added Succssefully')
      this.router.navigateByUrl('/admin/attribute');
    }, error => {
      alert(error.error)
    })
  }
}
