import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Assuming AuthService exists
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule here to enable ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user.name, user.email, user.password).subscribe(response => {
      console.log("User registered successfully", response);
    }, error => {
      console.error("Registration failed", error);
    });
  }
}
