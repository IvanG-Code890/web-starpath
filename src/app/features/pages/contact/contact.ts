import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

/**
 * Componente de la Página de Contacto.
 * Gestiona el formulario para enviar mensajes y reportar bugs.
 * Utiliza 'Template-Driven Forms' de Angular.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  /**
   * Método que se ejecuta al enviar el formulario.
   * @param form - El objeto del formulario que contiene los datos.
   */
  sendMessage(form: any) {
    // Comprobamos si el formulario es válido
    if (form.valid) {
      alert('¡Mensaje enviado correctamente! Gracias por contactar con Starpath.');
      form.reset(); // Limpia el formulario
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}
