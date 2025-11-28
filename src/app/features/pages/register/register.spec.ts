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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
