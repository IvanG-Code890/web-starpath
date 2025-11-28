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

  //PRUEBA 1: Creación
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //PRUEBA 2: Validación de campos vacíos
  it('debería mostrar error si los campos están vacíos', () => {
    component.email = '';
    component.password = '';
    component.login();
    
    expect(component.errores.length).toBeGreaterThan(0);
  });

  //PRUEBA 3: Lógica de llamada (Simulando error para evitar recarga)
  it('debería llamar a Supabase si el formulario es válido', async () => {
    component.email = 'test@test.com';
    component.password = '123456';

    (supabase.auth.signInWithPassword as jasmine.Spy).and.returnValue(
      Promise.resolve({ 
        data: { user: null, session: null }, 
        error: { message: 'Error simulado para evitar recarga' } 
      })
    );

    await component.login();

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456'
    });
  });

});
