import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { provideRouter } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';
import { FormsModule } from '@angular/forms';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () =>{
    spyOn(supabase.auth, "signUp").and.returnValue(
      Promise.resolve({
        data: {user : {} as any, session: null},
        error: null
      })
    )
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register, FormsModule],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // PRUEBA 1: Creación
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Validación de campos vacíos
  it('debería mostrar error si los campos están vacíos', () => {
    component.email = '';
    component.password = '';
    component.username = '';
    
    component.register();
    
    expect(component.errores.length).toBeGreaterThan(0);
    expect(component.errores).toContain('Por favor, rellena todos los campos.');
  });

  // PRUEBA 3: Validación de contraseña corta
  it('debería mostrar error si la contraseña es muy corta', () => {
    component.email = 'test@test.com';
    component.username = 'TestUser';
    component.password = '123'; // Muy corta
    
    component.register();
    
    expect(component.errores).toContain('La contraseña debe tener al menos 6 caracteres.');
  });
});
