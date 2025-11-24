import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { FormsModule } from '@angular/forms'; // Necesario para el formulario

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, FormsModule] // Importamos FormsModule para que el test entienda el HTML
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

