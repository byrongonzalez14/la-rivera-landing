import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ESPACIOS, APP_CONFIG } from '../../config/app.config';
import { SeoService } from '../../services/seo.service';
import { PricingService, PricingCalculation } from '../../services/pricing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  espacios = ESPACIOS;
  config = APP_CONFIG;
  
  // Calculator properties
  fechaEntrada = '';
  fechaSalida = '';
  huespedes = APP_CONFIG.aforoBase;
  calculation: PricingCalculation | null = null;

  constructor(
    private seoService: SeoService,
    public pricingService: PricingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'La Rivera - Espacios únicos para alquiler en entorno natural',
      description: 'Descubre La Rivera, hermosos espacios para alquiler con piscina, zona BBQ y entorno natural único. Perfecto para eventos, vacaciones y escapadas.',
      keywords: 'alquiler, espacios, piscina, BBQ, naturaleza, eventos, vacaciones, La Rivera',
      url: 'https://larivera.com',
      type: 'website'
    });

    this.seoService.updateCanonicalUrl('https://larivera.com');
    this.seoService.addStructuredData(this.seoService.generateBusinessStructuredData());
  }

  onCalculatorChange() {
    if (this.fechaEntrada && this.fechaSalida && this.huespedes) {
      const entrada = new Date(this.fechaEntrada);
      const salida = new Date(this.fechaSalida);
      this.calculation = this.pricingService.calcularPrecio(entrada, salida, this.huespedes);
    } else {
      this.calculation = null;
    }
  }

  goToReservation() {
    // Pass calculator data to reservation page via query params
    const queryParams: any = {};
    
    if (this.fechaEntrada) queryParams.fechaEntrada = this.fechaEntrada;
    if (this.fechaSalida) queryParams.fechaSalida = this.fechaSalida;
    if (this.huespedes) queryParams.huespedes = this.huespedes;
    
    this.router.navigate(['/reservar'], { queryParams });
  }
}
