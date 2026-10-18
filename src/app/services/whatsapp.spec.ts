import { TestBed } from '@angular/core/testing';

import { WhatsappService } from './whatsapp';
import { APP_CONFIG } from '../config/app.config';

describe('WhatsappService', () => {
  let service: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappService);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('deja el número solo con dígitos, como espera wa.me', () => {
    expect(service.numero).toBe(APP_CONFIG.contacto.whatsapp.replace(/\D/g, ''));
    expect(service.numero).not.toContain('+');
  });

  it('arma el enlace con el mensaje codificado', () => {
    const link = service.link('Hola, ¿hay cupo?');
    expect(link.startsWith(`https://wa.me/${service.numero}?text=`)).toBeTrue();
    expect(decodeURIComponent(link.split('text=')[1])).toBe('Hola, ¿hay cupo?');
  });

  it('codifica los saltos de línea del mensaje', () => {
    const link = service.link('linea 1\nlinea 2');
    expect(link).not.toContain('\n');
    expect(decodeURIComponent(link.split('text=')[1])).toContain('\n');
  });

  it('ofrece un mensaje genérico para los accesos del sitio', () => {
    expect(service.general).toContain('wa.me');
  });
});
