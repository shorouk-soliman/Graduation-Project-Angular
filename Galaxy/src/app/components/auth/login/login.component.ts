import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notificationMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')]),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  EmailError = () => this.loginForm.get('email')?.errors;
  PasswordError = () => this.loginForm.get('password')?.errors;

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value).subscribe({
        next: () => {
          this.notificationMessage = 'Login successful.';
        },
        error: (error: any) => {
            this.notificationMessage = 'Invalid email or password. Please try again.';
          } 
      });
    }
}
}

