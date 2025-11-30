import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoListadoPage } from './medicamento-listado.page';

describe('MedicamentoListadoPage', () => {
  let component: MedicamentoListadoPage;
  let fixture: ComponentFixture<MedicamentoListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
