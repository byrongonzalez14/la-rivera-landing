import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ESPACIOS } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';

type Espacio = (typeof ESPACIOS)[number];

@Component({
  selector: 'app-espacio-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './espacio-detalle.html',
  styleUrl: './espacio-detalle.scss'
})
export class EspacioDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  espacio?: Espacio;
  /** Número con el que aparece en el listado: mantiene la numeración 01–06. */
  numero = 0;

  ngOnInit() {
    // El slug cambia sin recrear el componente al saltar entre espacios.
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const i = ESPACIOS.findIndex(e => e.slug === slug);
      this.espacio = i >= 0 ? ESPACIOS[i] : undefined;
      this.numero = i + 1;

      if (this.espacio) {
        this.seo.updateSEO({
          title: `${this.espacio.nombre} — La Rivera`,
          description: this.espacio.descripcionCorta,
          image: this.espacio.imagen || '/images/hero/hero-page.jpg',
          url: `https://larivera.com/espacios/${this.espacio.slug}`
        });
      }
    });
  }
}
