import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home';
import { APP_CONFIG } from '../../config/app.config';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  describe('fechas por defecto', () => {
    it('arranca con llegada y salida en formato YYYY-MM-DD', () => {
      expect(component.checkIn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(component.checkOut).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('propone una estadía de dos noches', () => {
      expect(component.noches).toBe(2);
    });

    it('no ofrece fechas pasadas', () => {
      expect(component.checkIn >= component.hoy).toBeTrue();
    });
  });

  describe('coherencia entre llegada y salida', () => {
    it('empuja la salida si queda antes que la llegada', () => {
      component.checkIn = '2026-12-20';
      component.checkOut = '2026-12-15';
      component.onCheckInChange();
      expect(component.checkOut).toBe('2026-12-21');
    });

    it('empuja la salida si coincide con la llegada', () => {
      component.checkIn = '2026-12-20';
      component.checkOut = '2026-12-20';
      component.onCheckInChange();
      expect(component.checkOut).toBe('2026-12-21');
    });

    it('respeta una salida que ya es posterior', () => {
      component.checkIn = '2026-12-20';
      component.checkOut = '2026-12-28';
      component.onCheckInChange();
      expect(component.checkOut).toBe('2026-12-28');
    });

    it('suma el día sin desfase de zona horaria al cruzar de mes', () => {
      component.checkIn = '2026-11-30';
      component.checkOut = '2026-11-30';
      component.onCheckInChange();
      expect(component.checkOut).toBe('2026-12-01');
    });
  });

  describe('cotización', () => {
    beforeEach(() => {
      component.checkIn = '2026-12-01';
      component.checkOut = '2026-12-03';
    });

    it('calcula el total sin adicionales', () => {
      component.huespedes = 12;
      expect(component.noches).toBe(2);
      expect(component.hayAdicionales).toBeFalse();
      expect(component.totalBase).toBe(APP_CONFIG.tarifaBasePorNoche * 2);
      expect(component.total).toBe(APP_CONFIG.tarifaBasePorNoche * 2);
    });

    it('suma los adicionales sobre el aforo base', () => {
      component.huespedes = APP_CONFIG.aforoBase + 1;
      expect(component.adicionales).toBe(1);
      expect(component.hayAdicionales).toBeTrue();
      expect(component.totalAdicionales).toBe(APP_CONFIG.adicionalPorPersonaPorNoche * 2);
      expect(component.total).toBe(component.totalBase + component.totalAdicionales);
    });
  });

  describe('contador de huéspedes', () => {
    it('no baja de una persona', () => {
      component.huespedes = 1;
      component.menosHuespedes();
      expect(component.huespedes).toBe(1);
    });

    it('no supera el aforo máximo', () => {
      component.huespedes = APP_CONFIG.aforoMaximo;
      component.masHuespedes();
      expect(component.huespedes).toBe(APP_CONFIG.aforoMaximo);
    });

    it('sube y baja de uno en uno', () => {
      component.huespedes = 10;
      component.masHuespedes();
      expect(component.huespedes).toBe(11);
      component.menosHuespedes();
      expect(component.huespedes).toBe(10);
    });
  });

  describe('etiquetas en singular y plural', () => {
    it('dice "1 noche" para una sola noche', () => {
      component.checkIn = '2026-12-01';
      component.checkOut = '2026-12-02';
      expect(component.etiquetaNoches).toBe('1 noche');
    });

    it('dice "2 noches" para varias', () => {
      component.checkIn = '2026-12-01';
      component.checkOut = '2026-12-03';
      expect(component.etiquetaNoches).toBe('2 noches');
    });

    it('dice "1 adicional" para una persona extra', () => {
      component.huespedes = APP_CONFIG.aforoBase + 1;
      expect(component.etiquetaAdicionales).toBe('1 adicional');
    });

    it('dice "2 adicionales" para varias', () => {
      component.huespedes = APP_CONFIG.aforoBase + 2;
      expect(component.etiquetaAdicionales).toBe('2 adicionales');
    });
  });

  describe('enlace de WhatsApp', () => {
    beforeEach(() => {
      component.checkIn = '2026-12-01';
      component.checkOut = '2026-12-03';
      component.huespedes = 14;
    });

    it('apunta al número de contacto', () => {
      expect(component.waLink).toContain(APP_CONFIG.contacto.whatsapp.replace(/\D/g, ''));
    });

    it('incluye fechas, huéspedes y total', () => {
      const msg = decodeURIComponent(component.waLink.split('text=')[1]);
      expect(msg).toContain('2026-12-01');
      expect(msg).toContain('2026-12-03');
      expect(msg).toContain('Huéspedes: 14');
      expect(msg).toContain('2 noches');
    });

    it('omite nombre y motivo cuando están vacíos', () => {
      const msg = decodeURIComponent(component.waLink.split('text=')[1]);
      expect(msg).not.toContain('Nombre:');
      expect(msg).not.toContain('Motivo:');
    });

    it('incluye nombre y motivo cuando se llenan', () => {
      component.nombre = 'Byron';
      component.motivo = 'Descanso';
      const msg = decodeURIComponent(component.waLink.split('text=')[1]);
      expect(msg).toContain('Nombre: Byron');
      expect(msg).toContain('Motivo: Descanso');
    });
  });

  describe('preguntas frecuentes', () => {
    it('abre la primera por defecto', () => {
      expect(component.abierta).toBe(0);
    });

    it('cierra la que ya estaba abierta', () => {
      component.alternarFaq(0);
      expect(component.abierta).toBe(-1);
    });

    it('abre solo una a la vez', () => {
      component.alternarFaq(2);
      expect(component.abierta).toBe(2);
      component.alternarFaq(3);
      expect(component.abierta).toBe(3);
    });

    it('arma la respuesta de aforo con los valores de la config', () => {
      const faq = component.faqs[0];
      expect(faq.a).toContain(`${APP_CONFIG.aforoMaximo}`);
      expect(faq.a).toContain(`${APP_CONFIG.aforoBase}`);
    });
  });

  it('no publica testimonios inventados', () => {
    const html = (fixture.nativeElement as HTMLElement).innerHTML;
    expect(html).not.toContain('Familia Restrepo');
    expect(html).not.toContain('Equipo Nativa');
    expect(fixture.nativeElement.querySelector('blockquote')).toBeNull();
  });
});
