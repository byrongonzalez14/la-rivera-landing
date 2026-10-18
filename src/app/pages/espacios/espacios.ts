import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ESPACIOS } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './espacios.html',
  styleUrl: './espacios.scss'
})
export class EspaciosComponent implements OnInit {
  private seo = inject(SeoService);
  readonly espacios = ESPACIOS;

  ngOnInit() {
    this.seo.updateSEO({
      title: 'Espacios — La Rivera',
      description:
        'Piscina, kiosco, terraza, habitaciones, gimnasio y Bosque Paz: los seis espacios de La Rivera.',
      url: 'https://larivera.com/espacios'
    });
  }
}
