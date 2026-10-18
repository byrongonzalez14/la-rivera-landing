import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';
import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class ContactoComponent implements OnInit {
  private seo = inject(SeoService);
  private wa = inject(WhatsappService);

  readonly config = APP_CONFIG;
  readonly waLink = this.wa.link('Hola, me interesa hacer una reserva en La Rivera.');

  readonly pagos = [
    { nombre: 'Nequi', dato: APP_CONFIG.pagos.nequi, logo: '/images/logos/log-nequi.svg' },
    { nombre: 'Llave Bre-B', dato: APP_CONFIG.pagos.llaveBreB, logo: '/images/logos/logo-bre-b.svg' },
    {
      nombre: 'Bancolombia',
      dato: APP_CONFIG.pagos.bancolombia,
      logo: '/images/logos/logo-bancolombia.svg'
    }
  ];

  ngOnInit() {
    this.seo.updateSEO({
      title: 'Contacto — La Rivera',
      description:
        'Escríbenos por WhatsApp para consultar fechas y disponibilidad. Pagos por Nequi, Bre-B o Bancolombia.',
      url: 'https://larivera.com/contacto'
    });
  }
}
