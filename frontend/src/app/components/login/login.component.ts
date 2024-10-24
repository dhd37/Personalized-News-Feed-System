import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed, please try again');
      }
    );
  }
}
