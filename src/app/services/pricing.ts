import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../config/app.config';

export interface PricingCalculation {
  noches: number;
  huespedes: number;
  extras: number;
  totalPorNoche: number;
  total: number;
  valido: boolean;
  errores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor() { }

  calcularPrecio(fechaEntrada: Date, fechaSalida: Date, huespedes: number): PricingCalculation {
    const errores: string[] = [];
    let valido = true;

    // Validar fechas
    if (fechaSalida <= fechaEntrada) {
      errores.push('La fecha de salida debe ser posterior a la fecha de entrada');
      valido = false;
    }

    // Calcular noches
    const noches = Math.ceil((fechaSalida.getTime() - fechaEntrada.getTime()) / (1000 * 60 * 60 * 24));
    
    if (noches < APP_CONFIG.minNoches) {
      errores.push(`Mínimo ${APP_CONFIG.minNoches} noche(s)`);
      valido = false;
    }

    // Validar huéspedes
    if (huespedes < 1) {
      errores.push('Mínimo 1 huésped');
      valido = false;
    }

    if (huespedes > APP_CONFIG.aforoMaximo) {
      errores.push(`Máximo ${APP_CONFIG.aforoMaximo} huéspedes`);
      valido = false;
    }

    // Calcular extras y precio
    let totalPorNoche: number;
    let extras: number;

    if (huespedes < APP_CONFIG.aforoBase) {
      // Si hay menos de 18 personas, se cobra la tarifa base completa
      extras = 0;
      totalPorNoche = APP_CONFIG.tarifaBasePorNoche;
    } else {
      // Si hay 18 o más personas, se cobra tarifa base + extras
      extras = Math.max(0, huespedes - APP_CONFIG.aforoBase);
      const limitedExtras = Math.min(extras, APP_CONFIG.aforoMaximo - APP_CONFIG.aforoBase);
      totalPorNoche = APP_CONFIG.tarifaBasePorNoche + (limitedExtras * APP_CONFIG.adicionalPorPersonaPorNoche);
      extras = limitedExtras;
    }
    const total = totalPorNoche * Math.max(noches, 0);

    return {
      noches: Math.max(noches, 0),
      huespedes,
      extras,
      totalPorNoche,
      total,
      valido,
      errores
    };
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  }
}
