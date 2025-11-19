import { Component, OnInit } from '@angular/core';
import { ArticleCard } from '../../components/article-card/article-card';
import { Article } from '../../models/article.model';
import { MockDataService } from '../../services/mock-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, ArticleCard],
  templateUrl: './news.html',
  styleUrl: './news.css'
})
export class News implements OnInit {
  articles: Article[] = [];


  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.articles = this.dataService.getNews();
    console.log('MIS NOTICIAS SON:', this.articles);
  }
}