import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  constructor(private unit: UnitService) { }


  SignForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[ Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
    lastName: new FormControl('',[ Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
    email: new FormControl('',[ Validators.required,Validators.email]),
    password: new FormControl('',[ Validators.required,Validators.minLength(8)]),
  });

  FNameError = () => this.SignForm.get('firstName')?.errors
  LNameError = () => this.SignForm.get('lastName')?.errors
  EmailError = () => this.SignForm.get('email')?.errors
  PasswordError = () => this.SignForm.get('password')?.errors

  onSubmit(){
    this.unit.auth.Sign(this.SignForm.value);
  }

}
