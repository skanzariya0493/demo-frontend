import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  submitted = false;
  loading = false;
  errorMessage = '';
  loginResponse: unknown = null;

  constructor(private loginService: LoginService) {}

  onLogin() {
    this.submitted = false;
    this.loading = true;
    this.errorMessage = '';
    this.loginResponse = null;

    this.loginService.login(this.loginData).subscribe({
      next: (response) => {
        this.submitted = true;
        this.loginResponse = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
