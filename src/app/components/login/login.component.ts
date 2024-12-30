import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string | null = null;


  constructor(private authService: AuthService, private router:Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          this.authService.storeToken(response.token);
          this.router.navigate(['/form-template']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password.';
        }
      });
    }
  }

}
