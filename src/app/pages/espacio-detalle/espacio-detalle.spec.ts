import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { EspacioDetalleComponent } from './espacio-detalle';

/** Monta el componente como si la URL trajera ese slug. */
function montar(slug: string | null): ComponentFixture<EspacioDetalleComponent> {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [EspacioDetalleComponent],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: { paramMap: of(convertToParamMap(slug === null ? {} : { slug })) }
      }
    ]
  });
  const fixture = TestBed.createComponent(EspacioDetalleComponent);
  fixture.detectChanges();
  return fixture;
}

describe('EspacioDetalleComponent', () => {
  it('se crea', () => {
    expect(montar('piscina').componentInstance).toBeTruthy();
  });

  it('carga el espacio que pide la ruta', () => {
    const c = montar('piscina').componentInstance;
    expect(c.espacio?.slug).toBe('piscina');
    expect(c.espacio?.nombre).toBe('Piscina');
  });

  it('conserva la numeración del listado', () => {
    expect(montar('piscina').componentInstance.numero).toBe(1);
    expect(montar('bosque-paz').componentInstance.numero).toBe(6);
  });

  it('muestra amenidades y reglas', () => {
    const el = montar('piscina').nativeElement as HTMLElement;
    expect(el.querySelectorAll('.bloque').length).toBe(2);
    expect(el.querySelectorAll('.bloque li').length).toBeGreaterThan(0);
  });

  it('cae en el mensaje de no encontrado con un slug desconocido', () => {
    const fixture = montar('no-existe');
    expect(fixture.componentInstance.espacio).toBeUndefined();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('no existe');
  });

  it('no revienta si la ruta llega sin slug', () => {
    expect(montar(null).componentInstance.espacio).toBeUndefined();
  });
});
