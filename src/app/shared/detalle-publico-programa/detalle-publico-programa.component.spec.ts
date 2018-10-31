import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePublicoProgramaComponent } from './detalle-publico-programa.component';

describe('DetallePublicoProgramaComponent', () => {
  let component: DetallePublicoProgramaComponent;
  let fixture: ComponentFixture<DetallePublicoProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePublicoProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePublicoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
