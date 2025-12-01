import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'

/**
 * Componente de la Página "Cómo Jugar".
 *
 * Esta página sirve como guía o tutorial para los nuevos jugadores.
 * Explica la historia, los controles, las mecánicas básicas y las clases disponibles.
 *
 * Al final de la página, incluye una llamada a la acción (CTA) que redirige
 * al usuario a la página del juego o de registro.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-how-to-play',
  imports: [RouterLink],
  templateUrl: './how-to-play.html',
  styleUrl: './how-to-play.css',
})
export class HowToPlay {

}
