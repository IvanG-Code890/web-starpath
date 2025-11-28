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

  
});
