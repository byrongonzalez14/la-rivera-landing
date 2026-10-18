import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadComponent } from './privacidad';
import { APP_CONFIG } from '../../config/app.config';

describe('PrivacidadComponent', () => {
  let component: PrivacidadComponent;
  let fixture: ComponentFixture<PrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacidadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('publica los datos de contacto de la config', () => {
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain(APP_CONFIG.contacto.email);
    expect(texto).toContain(APP_CONFIG.contacto.telefono);
  });
});
