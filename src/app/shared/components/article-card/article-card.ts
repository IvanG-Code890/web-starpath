import { Component, Input } from '@angular/core';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [], 
  templateUrl: './article-card.html',
  styleUrl: './article-card.css'
})
export class ArticleCard{
  // Es la puerta de entrada para poder recibir datos
  @Input() article: Article | undefined;
}



