import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  submitted = false;

  get passwordsDoNotMatch() {
    return (
      this.registerData.confirmPassword.length > 0 &&
      this.registerData.password !== this.registerData.confirmPassword
    );
  }

  onRegister() {
    if (this.passwordsDoNotMatch) {
      return;
    }

    this.submitted = true;
  }
}
