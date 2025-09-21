import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'espacios',
    loadComponent: () => import('./pages/espacios/espacios').then(m => m.EspaciosComponent)
  },
  {
    path: 'espacios/:slug',
    loadComponent: () => import('./pages/espacio-detalle/espacio-detalle').then(m => m.EspacioDetalleComponent)
  },
  {
    path: 'reservar',
    loadComponent: () => import('./pages/reservar/reservar').then(m => m.ReservarComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent)
  },
  {
    path: 'legal/privacidad',
    loadComponent: () => import('./pages/privacidad/privacidad').then(m => m.PrivacidadComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
