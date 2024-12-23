import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string | null = null;


  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          this.authService.storeToken(response.token);
          alert('Login successful!');
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password.';
        }
      });
    }
  }

}
