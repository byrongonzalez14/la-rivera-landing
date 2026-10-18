import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComponent } from './contacto';
import { APP_CONFIG } from '../../config/app.config';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('enlaza a WhatsApp con el número de la config', () => {
    expect(component.waLink).toContain(APP_CONFIG.contacto.whatsapp.replace(/\D/g, ''));
  });

  it('lista los tres medios de pago', () => {
    expect(component.pagos.length).toBe(3);
    expect(component.pagos.map(p => p.nombre)).toEqual(['Nequi', 'Llave Bre-B', 'Bancolombia']);
  });

  it('muestra los datos de pago de la config', () => {
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain(APP_CONFIG.pagos.nequi);
    expect(texto).toContain(APP_CONFIG.pagos.bancolombia);
  });
});
