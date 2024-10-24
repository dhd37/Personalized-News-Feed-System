import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';  // Import CommonModule for slice pipe and other common directives
import { NgForOf } from '@angular/common';  // Import this for ngFor

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Make this component standalone
  imports: [CommonModule],  // Import CommonModule for pipes like 'slice'
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getPersonalizedArticles().subscribe(
      (response: any[]) => {
        this.articles = response;
      },
      (error) => {
        console.error('Failed to load articles', error);
      }
    );
  }
}
