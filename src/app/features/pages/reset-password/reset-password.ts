import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  newPassword = '';
  errores: string[] = [];
  successMessage: string | null = null;

  constructor(private router: Router) {}

  async updatePassword() {
    this.errores = [];
    this.successMessage = null;

    if (!this.newPassword) {
      this.errores.push('Debes introducir una nueva contraseña.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: this.newPassword });

    if (error) {
      this.errores.push('Error: ' + error.message);
    } else {
      this.successMessage = 'Tu contraseña ha sido actualizada correctamente.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }
  }
}
