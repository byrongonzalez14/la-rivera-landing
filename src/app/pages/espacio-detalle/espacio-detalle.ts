import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ESPACIOS } from '../../config/app.config';

@Component({
  selector: 'app-espacio-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './espacio-detalle.html',
  styleUrl: './espacio-detalle.scss'
})
export class EspacioDetalleComponent implements OnInit {
  espacio: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.espacio = ESPACIOS.find(e => e.slug === slug);
  }
}
