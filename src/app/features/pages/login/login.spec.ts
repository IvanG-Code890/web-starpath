import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideRouter } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';
import { FormsModule } from '@angular/forms';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () =>{
    spyOn(supabase.auth, "signInWithPassword").and.returnValue(
      Promise.resolve({
        data: { user: {} as any, session: {} as any }, 
        error: null
      })
    )
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, FormsModule],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si los campos están vacíos', () => {
    component.email = '';
    component.password = '';
    component.login();
    
    // Esperamos que la lista de errores no esté vacía
    expect(component.errores.length).toBeGreaterThan(0);
  });

  it('debería llamar a Supabase si el formulario es válido', async () => {
    component.email = 'test@test.com';
    component.password = '123456';

    // --- EL TRUCO MAESTRO ---
    // Sobreescribimos el espía SOLO para este test.
    // Le decimos que devuelva un ERROR. 
    // Así tu código entra en el "if (error)", para, y NO ejecuta el window.location.href
    (supabase.auth.signInWithPassword as jasmine.Spy).and.returnValue(
      Promise.resolve({ 
        data: { user: null, session: null }, 
        error: { message: 'Error simulado para evitar recarga' } 
      })
    );

    // Ejecutamos
    await component.login();

    // Comprobamos que se llamó (esto pasará igual, aunque haya dado error después)
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456'
    });
  });
  
});
