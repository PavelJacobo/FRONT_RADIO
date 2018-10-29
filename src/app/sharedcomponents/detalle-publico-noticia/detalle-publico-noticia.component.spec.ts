import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePublicoNoticiaComponent } from './detalle-publico-noticia.component';

describe('DetallePublicoNoticiaComponent', () => {
  let component: DetallePublicoNoticiaComponent;
  let fixture: ComponentFixture<DetallePublicoNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePublicoNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePublicoNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
