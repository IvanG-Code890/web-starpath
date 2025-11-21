import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
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

  async login() {
    const { data, error} = await signIn(this.email, this.password);

    if (error) {
      alert('Error' + error.message);
    } else {
      alert('Inicio de sesion exitoso')
    }
  }

}
