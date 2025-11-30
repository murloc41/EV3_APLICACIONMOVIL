import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteAgregarPage } from './paciente-agregar.page';

describe('PacienteAgregarPage', () => {
  let component: PacienteAgregarPage;
  let fixture: ComponentFixture<PacienteAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
