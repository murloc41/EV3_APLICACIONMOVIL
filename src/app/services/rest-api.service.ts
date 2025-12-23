import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Paciente {
  id: number;
  nombre: string;
  rut: string;
  piso: number;
  turno: string;
}

export interface Medicamento {
  id: number;
  nombre: string;
  dosisMg: number;
  tipo: string;
  usoDelicado: boolean;
}

@Injectable({ providedIn: 'root' })
export class RestApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Pacientes
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseUrl}/api/pacientes`);
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/api/pacientes/${id}`);
  }

  createPaciente(data: Omit<Paciente, 'id'>): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/api/pacientes`, data);
  }

  updatePaciente(id: number, data: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/api/pacientes/${id}`, data);
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/pacientes/${id}`);
  }

  // Medicamentos (opcional: implementar si el backend los expone)
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.baseUrl}/api/medicamentos`);
  }

  getMedicamentoById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.baseUrl}/api/medicamentos/${id}`);
  }

  createMedicamento(data: Omit<Medicamento, 'id'>): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.baseUrl}/api/medicamentos`, data);
  }

  updateMedicamento(id: number, data: Partial<Medicamento>): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.baseUrl}/api/medicamentos/${id}`, data);
  }

  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/medicamentos/${id}`);
  }
}
