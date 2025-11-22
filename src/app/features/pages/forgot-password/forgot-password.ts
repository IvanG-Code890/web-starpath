import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  errores: string[] = [];
  successMessage: string | null = null;

  async sendResetLink() {
    this.errores = [];
    this.successMessage = null;

    if (!this.email) {
      this.errores.push('Debes introducir tu correo electrónico.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(this.email, {
      redirectTo: 'http://localhost:4200/reset-password' // Ajusta a tu ruta real
    });

    if (error) {
      this.errores.push('Error: ' + error.message);
    } else {
      this.successMessage = 'Hemos enviado un enlace para restablecer tu contraseña.';
    }
  }
}
