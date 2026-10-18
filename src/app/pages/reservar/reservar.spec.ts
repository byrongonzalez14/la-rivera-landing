import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ReservarComponent } from './reservar';
import { APP_CONFIG } from '../../config/app.config';

describe('ReservarComponent', () => {
  let component: ReservarComponent;
  let fixture: ComponentFixture<ReservarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('arranca con el formulario inválido', () => {
    expect(component.reservaForm.valid).toBeFalse();
  });

  describe('validaciones', () => {
    it('rechaza un nombre con números', () => {
      const c = component.reservaForm.get('nombre')!;
      c.setValue('Byron 123');
      expect(c.valid).toBeFalse();
      c.setValue('Byron González');
      expect(c.valid).toBeTrue();
    });

    it('rechaza un correo mal formado', () => {
      const c = component.reservaForm.get('email')!;
      c.setValue('no-es-correo');
      expect(c.valid).toBeFalse();
      c.setValue('byron@latoai.com');
      expect(c.valid).toBeTrue();
    });

    it('exige un teléfono de 7 a 15 dígitos', () => {
      const c = component.reservaForm.get('telefono')!;
      c.setValue('123');
      expect(c.valid).toBeFalse();
      c.setValue('320693502a');
      expect(c.valid).toBeFalse();
      c.setValue('3206935023');
      expect(c.valid).toBeTrue();
    });

    it('obliga a aceptar las políticas', () => {
      const c = component.reservaForm.get('aceptaPoliticas')!;
      expect(c.valid).toBeFalse();
      c.setValue(true);
      expect(c.valid).toBeTrue();
    });
  });

  describe('cotización', () => {
    beforeEach(() => {
      component.reservaForm.patchValue({
        fechaEntrada: '2026-12-01',
        fechaSalida: '2026-12-04',
        huespedes: APP_CONFIG.aforoMaximo
      });
      component.calcularPrecio();
    });

    it('calcula noches, adicionales y total', () => {
      const extras = APP_CONFIG.aforoMaximo - APP_CONFIG.aforoBase;
      expect(component.calculation?.noches).toBe(3);
      expect(component.calculation?.extras).toBe(extras);
      expect(component.calculation?.total).toBe(
        (APP_CONFIG.tarifaBasePorNoche + extras * APP_CONFIG.adicionalPorPersonaPorNoche) * 3
      );
    });

    it('no calcula nada sin fechas', () => {
      component.reservaForm.patchValue({ fechaEntrada: '', fechaSalida: '' });
      expect(component.getPrecioEstimado()).toBeNull();
    });
  });

  describe('aviso de aforo mínimo', () => {
    it('avisa por debajo del aforo base', () => {
      component.reservaForm.patchValue({ huespedes: APP_CONFIG.aforoBase - 1 });
      expect(component.showMinimumGuestWarning).toBeTrue();
    });

    it('no avisa al llegar al aforo base', () => {
      component.reservaForm.patchValue({ huespedes: APP_CONFIG.aforoBase });
      expect(component.showMinimumGuestWarning).toBeFalse();
    });
  });

  it('ofrece Colombia como código de país por defecto', () => {
    expect(component.reservaForm.get('codigoPais')?.value).toBe('+57');
    expect(component.countries.some(c => c.code === '+57')).toBeTrue();
  });
});
