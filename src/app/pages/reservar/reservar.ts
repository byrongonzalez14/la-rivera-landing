import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PricingService, PricingCalculation } from '../../services/pricing';
import { APP_CONFIG } from '../../config/app.config';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.scss'
})
export class ReservarComponent implements OnInit {
  reservaForm: FormGroup;
  espacioSeleccionado: string | null = null;
  enviando = false;
  config = APP_CONFIG;
  calculation: PricingCalculation | null = null;
  selectedPaymentMethod: string = 'nequi'; // Método de pago por defecto
  
  // Lista de países para WhatsApp
  countries = [
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: '+52', name: 'México', flag: '🇲🇽' },
    { code: '+34', name: 'España', flag: '🇪🇸' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+51', name: 'Perú', flag: '🇵🇪' },
    { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+55', name: 'Brasil', flag: '🇧🇷' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public pricingService: PricingService
  ) {
    this.reservaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      codigoPais: ['+57', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      metodoPago: ['nequi', Validators.required],
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      huespedes: [4, [Validators.required, Validators.min(1), Validators.max(20)]],
      solicitudesEspeciales: [''],
      aceptaPoliticas: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    // Obtener datos de query params si existen
    this.route.queryParams.subscribe(params => {
      const formUpdates: any = {};
      
      if (params['espacio']) {
        this.espacioSeleccionado = params['espacio'];
        formUpdates.espacio = params['espacio'];
      }
      
      // Pre-fill dates and guests from home calculator
      if (params['fechaEntrada']) {
        formUpdates.fechaEntrada = params['fechaEntrada'];
      }
      
      if (params['fechaSalida']) {
        formUpdates.fechaSalida = params['fechaSalida'];
      }
      
      if (params['huespedes']) {
        formUpdates.huespedes = parseInt(params['huespedes']);
      }
      
      // Update form with query params data
      if (Object.keys(formUpdates).length > 0) {
        this.reservaForm.patchValue(formUpdates);
        // Trigger price calculation if we have the necessary data
        setTimeout(() => this.calcularPrecio(), 100);
      }
    });
  }

  onSubmit() {
    if (this.reservaForm.valid && this.calculation?.valido) {
      const formData = this.reservaForm.value;
      
      // Generar mensaje de WhatsApp y enviar directamente
      const whatsappMessage = this.generateWhatsAppMessage(formData, this.calculation);
      const whatsappNumber = this.config.contacto.whatsapp.replace('+', '');
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Guardar en localStorage para referencia
      this.saveReservationToStorage(formData, this.calculation);
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Mostrar mensaje de confirmación
      alert('¡Perfecto! Te hemos redirigido a WhatsApp para enviar tu solicitud de reserva. Nuestro equipo te responderá pronto con los detalles del pago.');
      
    } else if (!this.calculation?.valido) {
      alert('Error en el cálculo: ' + (this.calculation?.errores?.join(', ') || 'Datos incompletos'));
    } else {
      alert('Por favor completa todos los campos requeridos correctamente.');
    }
  }

  private saveReservationToStorage(formData: any, calculo: any) {
    const reservationData = {
      ...formData,
      calculo,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastReservation', JSON.stringify(reservationData));
  }

  private showSuccessMessage(formData: any, calculo: any) {
    const whatsappMessage = this.generateWhatsAppMessage(formData, calculo);
    const whatsappNumber = this.config.contacto.whatsapp.replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const confirmWhatsApp = confirm(
      '¡Solicitud de reserva lista!\n\n' +
      'Tu reserva está calculada. ¿Quieres enviarla por WhatsApp para proceder con el pago del anticipo?'
    );

    if (confirmWhatsApp) {
      window.open(whatsappUrl, '_blank');
    }
  }

  private showWhatsAppFallback(formData: any, calculo: any) {
    const whatsappMessage = this.generateWhatsAppMessage(formData, calculo);
    const whatsappNumber = this.config.contacto.whatsapp.replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const confirmWhatsApp = confirm(
      '¿Quieres enviar tu reserva por WhatsApp?\n\n' +
      'Te ayudaremos con el proceso de pago del anticipo.'
    );

    if (confirmWhatsApp) {
      window.open(whatsappUrl, '_blank');
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  getPaymentDetails(method: string): string {
    switch (method) {
      case 'nequi':
        return `💜 *NEQUI*\nNúmero: ${this.config.pagos.nequi}`;
      case 'bancolombia':
        return `🟡 *BANCOLOMBIA*\nCuenta: ${this.config.pagos.bancolombia}`;
      case 'bre-b':
        return `🔴 *BRE-B*\nLlave: ${this.config.pagos.llaveBreB}`;
      default:
        return 'Método no especificado';
    }
  }

  private generateWhatsAppMessage(formData: any, calculo: any): string {
    const anticipo = Math.round(calculo.total * 0.5);
    const saldo = calculo.total - anticipo;
    const paymentMethodName = this.getPaymentMethodName(formData.metodoPago);
    
    return `🏡 *Hola, me encuentro interesado en hacer una reserva en La Rivera*\n\n` +
           `👤 *DATOS DEL CLIENTE*\n` +
           `• Nombre: ${formData.nombre}\n` +
           `• Email: ${formData.email}\n` +
           `• WhatsApp: ${formData.codigoPais} ${formData.telefono}\n\n` +
           `📅 *DETALLES DE LA ESTADÍA*\n` +
           `• Fecha entrada: ${formData.fechaEntrada}\n` +
           `• Fecha salida: ${formData.fechaSalida}\n` +
           `• Número de huéspedes: ${formData.huespedes}\n` +
           `• Noches: ${calculo.noches}\n\n` +
           `💰 *INFORMACIÓN DE COSTOS*\n` +
           `• Total estadía: ${this.pricingService.formatearPrecio(calculo.total)}\n` +
           `• Anticipo requerido (50%): ${this.pricingService.formatearPrecio(anticipo)}\n` +
           `• Saldo al check-in: ${this.pricingService.formatearPrecio(saldo)}\n\n` +
           `💳 *MÉTODO DE PAGO PREFERIDO*\n` +
           `Voy a realizar el pago por medio de: *${paymentMethodName}*\n\n` +
           `📝 *Solicitudes especiales:*\n${formData.solicitudesEspeciales || 'Ninguna'}\n\n` +
           `✅ *Por favor confirmen disponibilidad y envíen datos para el pago del anticipo.*`;
  }

  private getPaymentMethodName(method: string): string {
    switch (method) {
      case 'nequi': return 'Nequi';
      case 'bancolombia': return 'Bancolombia';
      case 'bre-b': return 'Llave Bre-b';
      default: return 'No especificado';
    }
  }

  sendWhatsAppMessage() {
    const lastReservation = localStorage.getItem('lastReservation');
    if (lastReservation) {
      const data = JSON.parse(lastReservation);
      const whatsappMessage = this.generateWhatsAppMessage(data, data.calculo);
      const whatsappNumber = this.config.contacto.whatsapp.replace('+', '');
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else if (this.reservaForm.valid && this.calculation?.valido) {
      // Si no hay reserva guardada pero el formulario es válido, usar datos actuales
      const formData = this.reservaForm.value;
      const whatsappMessage = this.generateWhatsAppMessage(formData, this.calculation);
      const whatsappNumber = this.config.contacto.whatsapp.replace('+', '');
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('Por favor completa el formulario antes de enviar por WhatsApp.');
    }
  }

  calcularPrecio() {
    this.calculation = this.getPrecioEstimado();
  }

  getPrecioEstimado() {
    const formData = this.reservaForm.value;
    if (formData.fechaEntrada && formData.fechaSalida && formData.huespedes) {
      const fechaEntrada = new Date(formData.fechaEntrada);
      const fechaSalida = new Date(formData.fechaSalida);
      return this.pricingService.calcularPrecio(fechaEntrada, fechaSalida, formData.huespedes);
    }
    return null;
  }

  // Verificar si hay menos de 18 personas
  get showMinimumGuestWarning(): boolean {
    const huespedes = this.reservaForm.get('huespedes')?.value;
    return huespedes && huespedes < 18;
  }
}
