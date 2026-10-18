import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('se crea', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('monta el header y el pie en todas las rutas', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.site-header')).toBeTruthy();
    expect(el.querySelector('.site-footer')).toBeTruthy();
  });

  it('acredita la autoría enlazando al sitio de Byron', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const credito = fixture.nativeElement.querySelector('.footer-credit a') as HTMLAnchorElement;
    expect(credito).toBeTruthy();
    expect(credito.getAttribute('href')).toContain('byrongonzalez.com.co');
    expect(credito.getAttribute('target')).toBe('_blank');
  });

  it('ya no monta el botón flotante de WhatsApp', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.wa-float')).toBeNull();
  });
});
