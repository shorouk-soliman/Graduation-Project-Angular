import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  notificationMessage: string | null = null;

  constructor(private authService: AuthService) { }

  SignForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')]),
  });

  FNameError = () => this.SignForm.get('firstName')?.errors;
  LNameError = () => this.SignForm.get('lastName')?.errors;
  EmailError = () => this.SignForm.get('email')?.errors;
  PasswordError = () => this.SignForm.get('password')?.errors;

  onSubmit() {
    if (this.SignForm.valid) {
      this.authService.Sign(this.SignForm.value).subscribe({
        next: () => {
          this.notificationMessage = 'Registration successful.';
        },
        error: (error: any) => {
          if (error.status === 400 && error.error === 'this email is already exiest') {
            this.notificationMessage = 'Email is already in use. Please use a different email.';
          } else {
            this.notificationMessage = 'An error occurred. Please try again.';
          }
        }
      });
    }
  }
}
