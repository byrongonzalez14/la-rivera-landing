import { TestBed } from '@angular/core/testing';

import { PricingService } from './pricing';
import { APP_CONFIG } from '../config/app.config';

describe('PricingService', () => {
  let service: PricingService;

  const { tarifaBasePorNoche, adicionalPorPersonaPorNoche, aforoBase, aforoMaximo } = APP_CONFIG;

  /** Fechas locales, como las construye el cotizador. */
  const fecha = (a: number, m: number, d: number) => new Date(a, m - 1, d);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingService);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  describe('cálculo de noches', () => {
    it('cuenta las noches entre dos fechas', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 3), 12);
      expect(r.noches).toBe(2);
      expect(r.valido).toBeTrue();
    });

    it('acepta una sola noche', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 2), 12);
      expect(r.noches).toBe(1);
      expect(r.valido).toBeTrue();
    });

    it('cruza el cambio de mes sin perder noches', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 29), fecha(2026, 12, 2), 12);
      expect(r.noches).toBe(3);
    });
  });

  describe('tarifa', () => {
    it('cobra la tarifa base completa por debajo del aforo base', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 3), aforoBase - 6);
      expect(r.extras).toBe(0);
      expect(r.totalPorNoche).toBe(tarifaBasePorNoche);
      expect(r.total).toBe(tarifaBasePorNoche * 2);
    });

    it('no cobra adicionales justo en el aforo base', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 2), aforoBase);
      expect(r.extras).toBe(0);
      expect(r.totalPorNoche).toBe(tarifaBasePorNoche);
    });

    it('cobra un adicional por cada persona sobre el aforo base', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 3), aforoBase + 1);
      expect(r.extras).toBe(1);
      expect(r.totalPorNoche).toBe(tarifaBasePorNoche + adicionalPorPersonaPorNoche);
      expect(r.total).toBe((tarifaBasePorNoche + adicionalPorPersonaPorNoche) * 2);
    });

    it('multiplica los adicionales por el número de noches', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 4), aforoMaximo);
      const extras = aforoMaximo - aforoBase;
      expect(r.noches).toBe(3);
      expect(r.extras).toBe(extras);
      expect(r.total).toBe((tarifaBasePorNoche + extras * adicionalPorPersonaPorNoche) * 3);
    });

    it('nunca cobra más adicionales que el margen entre aforo base y máximo', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 2), aforoMaximo + 5);
      expect(r.extras).toBe(aforoMaximo - aforoBase);
    });
  });

  describe('validación', () => {
    it('rechaza una salida anterior a la llegada', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 5), fecha(2026, 11, 2), 12);
      expect(r.valido).toBeFalse();
      expect(r.errores.length).toBeGreaterThan(0);
    });

    it('rechaza llegada y salida el mismo día', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 2), fecha(2026, 11, 2), 12);
      expect(r.valido).toBeFalse();
    });

    it('rechaza cero huéspedes', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 2), 0);
      expect(r.valido).toBeFalse();
    });

    it('rechaza superar el aforo máximo', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 1), fecha(2026, 11, 2), aforoMaximo + 1);
      expect(r.valido).toBeFalse();
      expect(r.errores.join(' ')).toContain(`${aforoMaximo}`);
    });

    it('nunca devuelve noches negativas', () => {
      const r = service.calcularPrecio(fecha(2026, 11, 10), fecha(2026, 11, 1), 12);
      expect(r.noches).toBe(0);
    });
  });

  describe('formatearPrecio', () => {
    it('formatea en pesos sin decimales', () => {
      const texto = service.formatearPrecio(1200000);
      expect(texto).toContain('1.200.000');
      expect(texto).not.toContain(',00');
    });
  });
});
