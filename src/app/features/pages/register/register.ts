import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { signUp } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

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

  async register() {
    const { data, error } = await signUp(this.email, this.password);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Registro exitoso, revisa tu correo para confirmar');
    }
  }

}