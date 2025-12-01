import { Component, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de la Página de Registro.
 *
 * Permite a los nuevos usuarios crear una cuenta en la aplicación.
 * Gestiona el formulario de registro (nombre de usuario, email, contraseña),
 * valida los datos y se comunica con Supabase para crear el usuario.
 *
 * También implementa lógica de seguridad para detectar usuarios duplicados
 * y notifica al usuario para que verifique su correo electrónico.
 *
 * @author Iván Gastineau y Pablo Nicolás
 * @version 1.0
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username = ''; 
  email = '';
  password = '';
  
  loading = false;
  errores: string[] = [];

  // 2. Inyectamos el detector de cambios (cd)
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {}

  /**
   * Método principal de registro de usuario.
   *
   * 1. Reinicia errores y realiza validaciones locales (campos vacíos, formato email, longitud password).
   * 2. Llama a Supabase para crear el usuario (signUp).
   * 3. Gestiona errores del servidor (usuario ya existe, email inválido).
   * 4. Implementa una comprobación adicional de seguridad para detectar usuarios duplicados
   * incluso si Supabase devuelve un éxito falso (por seguridad/privacidad).
   * 5. Si es exitoso, muestra una alerta y redirige al Login.
   */
  async register() {
    this.errores = [];

    // Validaciones iniciales
    if (!this.email || !this.password) {
      this.errores.push('Por favor, rellena todos los campos.');
      return;
    }

    // Validar formato email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errores.push('El formato del correo no es válido.');
      return;
    }

    if (this.password.length < 6) {
      this.errores.push('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      this.loading = true;
      // Forzamos actualización para que salga "REGISTRANDO..."
      this.cd.detectChanges(); 

      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            username: this.username
          }
        }
      });

      if (error) {
        console.error('Error registro:', error.message);
        this.errores.push(error.message);
        
        // Paramos la carga y forzamos actualización
        this.loading = false;
        this.cd.detectChanges();
        return;
      } 
      
      // Comprobación de usuario duplicado (Para evitar que siempre salga usuario registrado aunque ya exista )
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        this.errores.push('Este correo electrónico ya está registrado.');
        

        // Paramos la carga y avisamos a Angular
        this.loading = false;
        this.cd.detectChanges(); 
        return;
      }

      // Si todo va bien
      alert('¡Registro exitoso! Por favor, revisa tu bandeja de entrada para confirmar tu correo antes de iniciar sesión.');
      this.router.navigate(['/login']);

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.loading = false;
      // 3. Otro aviso a Angular, aseguramos que el botón se desbloquea siempre
      this.cd.detectChanges();
    }
  }
}