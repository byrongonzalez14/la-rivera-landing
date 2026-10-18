import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'La Rivera - Casa Campestre';
}
