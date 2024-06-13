import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private unit: UnitService) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')
    ]),
  })

  ngOnInit(): void {
  }


  EmailError = () => this.loginForm.get('email')?.errors
  PasswordError = () => this.loginForm.get('password')?.errors

  onSubmit(){
    this.unit.auth.Login(this.loginForm.value);
  }



}

