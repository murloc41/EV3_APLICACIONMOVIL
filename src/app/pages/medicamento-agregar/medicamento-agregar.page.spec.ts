import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoAgregarPage } from './medicamento-agregar.page';

describe('MedicamentoAgregarPage', () => {
  let component: MedicamentoAgregarPage;
  let fixture: ComponentFixture<MedicamentoAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
