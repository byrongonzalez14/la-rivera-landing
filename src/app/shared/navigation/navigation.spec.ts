import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavigationComponent } from './navigation';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.closeMenu();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('empieza con el menú móvil cerrado', () => {
    expect(component.menuOpen()).toBeFalse();
  });

  it('abre y cierra el menú móvil', () => {
    component.toggleMenu();
    expect(component.menuOpen()).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen()).toBeFalse();
  });

  it('bloquea el scroll del fondo mientras el menú está abierto', () => {
    component.toggleMenu();
    expect(document.body.style.overflow).toBe('hidden');
    component.closeMenu();
    expect(document.body.style.overflow).toBe('');
  });

  describe('fondo del header', () => {
    /** window.scrollY es de solo lectura: lo redefinimos para la prueba. */
    const conScroll = (y: number) => {
      Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
      component.onScroll();
    };

    afterEach(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    });

    it('es transparente en lo alto del home, sobre el hero oscuro', () => {
      component.onHome.set(true);
      conScroll(0);
      expect(component.solid).toBeFalse();
    });

    it('se asienta apenas arranca el scroll, sin esperar a salir del hero', () => {
      component.onHome.set(true);
      conScroll(40);
      expect(component.solid).toBeTrue();
    });

    it('aguanta el rebote de los primeros píxeles sin parpadear', () => {
      component.onHome.set(true);
      conScroll(8);
      expect(component.solid).toBeFalse();
    });

    it('vuelve a ser transparente al regresar arriba', () => {
      component.onHome.set(true);
      conScroll(400);
      expect(component.solid).toBeTrue();
      conScroll(0);
      expect(component.solid).toBeFalse();
    });

    it('va siempre sólido fuera del home, donde no hay hero detrás', () => {
      component.onHome.set(false);
      conScroll(0);
      expect(component.solid).toBeTrue();
    });
  });
});
