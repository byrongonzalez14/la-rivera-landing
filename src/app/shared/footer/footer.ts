import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  private wa = inject(WhatsappService);

  readonly waLink = this.wa.general;
  readonly year = new Date().getFullYear();
}
