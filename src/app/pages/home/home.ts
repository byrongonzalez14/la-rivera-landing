import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ESPACIOS, APP_CONFIG } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';
import { PricingService } from '../../services/pricing';
import { WhatsappService } from '../../services/whatsapp';

interface Momento {
  time: string;
  title: string;
  text: string;
}

interface Resena {
  q: string;
  who: string;
  what: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  private wa = inject(WhatsappService);
  readonly pricing = inject(PricingService);

  readonly config = APP_CONFIG;
  readonly espacios = ESPACIOS;

  /* --- Cotizador --- */
  checkIn = this.enDias(14);
  checkOut = this.enDias(16);
  huespedes = 12;
  nombre = '';
  motivo = '';

  /* --- Preguntas frecuentes --- */
  abierta = 0;

  readonly momentos: Momento[] = [
    {
      time: 'MAÑANA',
      title: 'Café en el corredor',
      text: 'Despierta sin alarma, con niebla sobre los árboles y el canto de los pájaros.'
    },
    {
      time: 'MEDIODÍA',
      title: 'Piscina y sol',
      text: 'Un chapuzón, una hamaca y un almuerzo largo bajo el kiosco.'
    },
    {
      time: 'TARDE',
      title: 'Caminata al río',
      text: 'Recorre el terreno, mete los pies al agua y mira cómo cambia la luz.'
    },
    {
      time: 'NOCHE',
      title: 'Fogata y estrellas',
      text: 'Asado, buena conversación y un cielo que en la ciudad no se ve.'
    }
  ];

  readonly resenas: Resena[] = [
    {
      q: 'Llegamos cansados y nos fuimos nuevos. Los niños no quisieron salir de la piscina en todo el fin de semana.',
      who: 'Familia Restrepo',
      what: 'Fin de semana familiar'
    },
    {
      q: 'Celebramos los 60 de mi mamá aquí. La casa es preciosa y la atención, impecable.',
      who: 'Carolina M.',
      what: 'Celebración'
    },
    {
      q: 'Hicimos nuestro retiro de equipo. Espacio, silencio y naturaleza: justo lo que necesitábamos.',
      who: 'Equipo Nativa',
      what: 'Retiro de empresa'
    }
  ];

  /* --- Galería (mosaico del rediseño) --- */
  readonly galeria = [
    { src: '/images/hero/hero-page.jpg', alt: 'Vista amplia del terreno', span: 'g1' },
    { src: '/images/espacios/piscina/piscina-hero.jpg', alt: 'La piscina', span: 'g2' },
    { src: '/images/espacios/habitaciones/habitaciones-hero.JPEG', alt: 'Una habitación', span: 'g3' },
    { src: '/images/espacios/gimnasio/gimnasio-hero.jpg', alt: 'El gimnasio', span: 'g4' },
    { src: '/images/espacios/kiosco/kiosco-hero.jpg', alt: 'El kiosco', span: 'g5' },
    { src: '/images/espacios/terraza/terraza-hero.JPG', alt: 'La terraza', span: 'g6' }
  ];

  ngOnInit() {
    this.seo.updateSEO({
      title: 'La Rivera — Casa Campestre en Rozo, Valle del Cauca',
      description:
        'Una casa campestre rodeada de verde, agua y silencio. Hasta ' +
        this.config.aforoMaximo +
        ' huéspedes, piscina, kiosco, terraza y bosque. Consulta fechas por WhatsApp.',
      keywords:
        'casa campestre, finca, Rozo, Valle del Cauca, alquiler, piscina, kiosco, eventos, La Rivera',
      image: '/images/hero/hero-page.jpg',
      url: 'https://larivera.com',
      type: 'website'
    });
    this.seo.updateCanonicalUrl('https://larivera.com');
    this.seo.addStructuredData(this.seo.generateBusinessStructuredData());
  }

  /* ------------------------------------------------------------------ *
   *  Cotizador
   * ------------------------------------------------------------------ */

  get hoy(): string {
    return this.enDias(0);
  }

  /** La salida siempre va al menos una noche después de la llegada. */
  get minSalida(): string {
    return this.sumarUnDia(this.checkIn);
  }

  get calculo() {
    return this.pricing.calcularPrecio(
      this.parse(this.checkIn),
      this.parse(this.checkOut),
      this.huespedes
    );
  }

  get noches(): number {
    return this.calculo.noches;
  }

  get etiquetaNoches(): string {
    return this.noches === 1 ? '1 noche' : `${this.noches} noches`;
  }

  get adicionales(): number {
    return this.calculo.extras;
  }

  get hayAdicionales(): boolean {
    return this.adicionales > 0 && this.noches > 0;
  }

  get etiquetaAdicionales(): string {
    return this.adicionales === 1 ? '1 adicional' : `${this.adicionales} adicionales`;
  }

  get totalBase(): number {
    return this.config.tarifaBasePorNoche * this.noches;
  }

  get totalAdicionales(): number {
    return this.config.adicionalPorPersonaPorNoche * this.adicionales * this.noches;
  }

  get total(): number {
    return this.calculo.total;
  }

  onCheckInChange() {
    // Si la salida quedó antes o igual a la llegada, empújala una noche.
    if (this.checkOut <= this.checkIn) {
      this.checkOut = this.sumarUnDia(this.checkIn);
    }
  }

  masHuespedes() {
    this.huespedes = Math.min(this.config.aforoMaximo, this.huespedes + 1);
  }

  menosHuespedes() {
    this.huespedes = Math.max(1, this.huespedes - 1);
  }

  get waLink(): string {
    const lineas = [
      'Hola, quiero reservar La Rivera.',
      this.nombre ? `Nombre: ${this.nombre}` : '',
      `Llegada: ${this.checkIn}`,
      `Salida: ${this.checkOut} (${this.etiquetaNoches})`,
      `Huéspedes: ${this.huespedes}`,
      this.motivo ? `Motivo: ${this.motivo}` : '',
      `Total estimado: ${this.pricing.formatearPrecio(this.total)}`
    ].filter(Boolean);
    return this.wa.link(lineas.join('\n'));
  }

  /* ------------------------------------------------------------------ *
   *  Preguntas frecuentes
   * ------------------------------------------------------------------ */

  get faqs() {
    const p = (n: number) => this.pricing.formatearPrecio(n);
    return [
      {
        q: '¿Cuántas personas pueden quedarse?',
        a:
          `La casa recibe hasta ${this.config.aforoMaximo} huéspedes. La tarifa base cubre hasta ` +
          `${this.config.aforoBase} personas; desde la persona ${this.config.aforoBase + 1} se suma ` +
          `${p(this.config.adicionalPorPersonaPorNoche)} por noche.`
      },
      {
        q: '¿Se admiten mascotas?',
        a: 'Sí, tus mascotas son bienvenidas. Solo te pedimos avisarnos al reservar.'
      },
      {
        q: '¿Puedo celebrar un evento?',
        a: 'Sí. Recibimos cumpleaños, reuniones familiares, retiros de empresa y celebraciones pequeñas. Escríbenos para coordinar los detalles.'
      },
      {
        q: '¿Cómo se confirma la reserva?',
        a: 'Envías tu solicitud por WhatsApp, verificamos disponibilidad y confirmamos con un anticipo por Nequi, Bre-B o transferencia Bancolombia.'
      },
      {
        q: '¿Qué debo llevar?',
        a: 'Solo tu comida y tus ganas de descansar. La casa cuenta con ropa de cama, toallas y cocina equipada.'
      }
    ];
  }

  alternarFaq(i: number) {
    this.abierta = this.abierta === i ? -1 : i;
  }

  /* ------------------------------------------------------------------ *
   *  Fechas (YYYY-MM-DD en hora local, no UTC)
   * ------------------------------------------------------------------ */

  private enDias(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return this.iso(d);
  }

  private sumarUnDia(fecha: string): string {
    const d = this.parse(fecha);
    d.setDate(d.getDate() + 1);
    return this.iso(d);
  }

  /**
   * `new Date('2026-11-01')` se interpreta como UTC y en Colombia (UTC-5)
   * retrocede un día. Construimos la fecha en hora local.
   */
  private parse(fecha: string): Date {
    const [a, m, d] = fecha.split('-').map(Number);
    return new Date(a, m - 1, d);
  }

  private iso(d: Date): string {
    const mes = `${d.getMonth() + 1}`.padStart(2, '0');
    const dia = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }
}
