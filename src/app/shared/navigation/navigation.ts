import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {
  /** En el home el header flota sobre el hero oscuro; en el resto va sólido. */
  readonly onHome = signal(false);
  /** Pasado el hero, el header se vuelve sólido para que el CTA siga legible. */
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setHome(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.setHome(e.urlAfterRedirects);
        this.closeMenu();
        this.onScroll();
      });
    this.onScroll();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    document.body.style.removeProperty('overflow');
  }

  /** Sólido salvo que estemos arriba del hero del home. */
  get solid(): boolean {
    return !this.onHome() || this.scrolled();
  }

  /** Margen antes de asentar el header: evita parpadeos por el rebote del scroll. */
  private static readonly UMBRAL = 16;

  @HostListener('window:scroll')
  onScroll() {
    if (!this.onHome()) {
      this.scrolled.set(true);
      return;
    }
    // En el home se asienta apenas arranca el scroll, no al salir del hero.
    this.scrolled.set(window.scrollY > NavigationComponent.UMBRAL);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.removeProperty('overflow');
  }

  private setHome(url: string) {
    const path = url.split('?')[0].split('#')[0];
    this.onHome.set(path === '/' || path === '');
  }
}
