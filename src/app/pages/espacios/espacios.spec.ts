import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EspaciosComponent } from './espacios';
import { ESPACIOS } from '../../config/app.config';

describe('EspaciosComponent', () => {
  let component: EspaciosComponent;
  let fixture: ComponentFixture<EspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaciosComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('lista todos los espacios', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll('.espacio');
    expect(tarjetas.length).toBe(ESPACIOS.length);
  });

  it('respeta el orden del rediseño', () => {
    expect(ESPACIOS.map(e => e.slug)).toEqual([
      'piscina',
      'kiosco',
      'terraza',
      'habitaciones',
      'gimnasio',
      'bosque-paz'
    ]);
  });

  it('usa rutas de imagen absolutas, que no se rompen en /espacios/:slug', () => {
    ESPACIOS.filter(e => e.imagen).forEach(e => {
      expect(e.imagen.startsWith('/')).toBeTrue();
    });
  });

  it('muestra un marcador en el espacio que todavía no tiene foto', () => {
    expect(fixture.nativeElement.querySelector('.frame--empty')).toBeTruthy();
  });
});
