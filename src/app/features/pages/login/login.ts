import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { signIn } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'   
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;

  errores: string[] = [];

  constructor(private router: Router) {
    // Al cargar el componente, recuperar datos guardados
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

  async login() {
    this.errores = []; 

    if (!this.email) {
      this.errores.push('Debes introducir tu correo electrónico.');
    }
    if (!this.password) {
      this.errores.push('Debes introducir tu contraseña.');
    }
    if (this.errores.length > 0) {
      return;
    }

    const { data, error } = await signIn(this.email, this.password);

    if (error) {
      this.errores.push('Correo o contraseña incorrectos.');
    } else {
      // Guardar datos si el checkbox está marcado
      if (this.rememberMe) {
        localStorage.setItem('rememberEmail', this.email);
        localStorage.setItem('rememberPassword', this.password);
      } else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
      }

      // Redirigir directamente al dashboard
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    }
  }
}
