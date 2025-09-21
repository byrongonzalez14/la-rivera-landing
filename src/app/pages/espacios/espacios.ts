import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ESPACIOS } from '../../config/app.config';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './espacios.html',
  styleUrl: './espacios.scss'
})
export class EspaciosComponent {
  espacios = ESPACIOS;
}
