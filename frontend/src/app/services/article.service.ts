import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:5001/api/articles';  

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getPersonalizedArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personalized`);
  }
}
