import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente de la Página de Inicio (Home).
 *
 * Esta es la página de aterrizaje (Landing Page) de la aplicación.
 * Su objetivo es presentar el juego "Starpath RPG" al usuario y ofrecerle
 * accesos rápidos a las acciones principales: Registrarse para jugar o
 * consultar las últimas novedades.
 *
 * @author Iván Gastineau y Pablo Nicolás
 * @version 1.0
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
