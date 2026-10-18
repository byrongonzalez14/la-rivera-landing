import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';
import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacidad.html',
  styleUrl: './privacidad.scss'
})
export class PrivacidadComponent implements OnInit {
  private seo = inject(SeoService);
  private wa = inject(WhatsappService);

  readonly config = APP_CONFIG;
  readonly waLink = this.wa.general;

  ngOnInit() {
    this.seo.updateSEO({
      title: 'Política de privacidad — La Rivera',
      description: 'Qué datos recopila La Rivera, para qué los usa y qué derechos tienes sobre ellos.',
      url: 'https://larivera.com/legal/privacidad'
    });
  }
}
