import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Import tap to perform actions on observable responses

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/auth';  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (this.isBrowser()) {  // Ensure this only runs in the browser
          localStorage.setItem('token', response.token);  // Store JWT token in localStorage
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');  // Only access localStorage if in the browser
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}