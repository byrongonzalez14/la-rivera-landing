import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  /** Número en el formato que espera wa.me: solo dígitos. */
  readonly numero = APP_CONFIG.contacto.whatsapp.replace(/\D/g, '');

  link(mensaje: string): string {
    return `https://wa.me/${this.numero}?text=${encodeURIComponent(mensaje)}`;
  }

  /** Mensaje genérico para los accesos directos del sitio (footer, botón flotante). */
  get general(): string {
    return this.link('Hola, me gustaría saber más sobre La Rivera.');
  }
}
