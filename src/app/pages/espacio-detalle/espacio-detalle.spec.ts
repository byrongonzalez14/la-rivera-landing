import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioDetalle } from './espacio-detalle';

describe('EspacioDetalle', () => {
  let component: EspacioDetalle;
  let fixture: ComponentFixture<EspacioDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacioDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacioDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
