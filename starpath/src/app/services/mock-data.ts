import { Injectable } from '@angular/core';
// Importa el modelo (fíjate en la ruta relativa ../..)
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService { // ¡Asegúrate de que dice "export class"!
  constructor() { }

  getNews(): Article[] {
    return [
      {
        id: 1,
        title: 'Noticia 1',
        subtitle: 'Subtitulo 1',
        imageUrl: 'https://via.placeholder.com/150',
        content: 'Contenido 1'
      }
    ];
  }
}