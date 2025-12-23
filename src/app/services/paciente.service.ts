import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Paciente {
  id: number;
  nombre: string;
  rut: string;
  piso: number;
  turno: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private storage: Storage | null = null;
  private pacientesSubject = new BehaviorSubject<Paciente[]>([]);
  public pacientes$ = this.pacientesSubject.asObservable();
  private nextId = 5; // Para generar IDs nuevos (comenzamos en 5)
  private storageReady: Promise<void>; // ⚡ Promise para esperar inicialización

  constructor(private storageService: Storage) {
    this.storageReady = this.initStorage();
  }

  /**
   * Inicializa el Storage y carga datos por defecto
   */
  async initStorage(): Promise<void> {
    try {
      this.storage = await this.storageService.create();
      await this.cargarPacientesDelStorage();
      console.log('✅ PacienteService: Storage inicializado');
    } catch (error) {
      console.error('❌ Error inicializando Storage:', error);
    }
  }

  /**
   * Asegura que Storage esté listo antes de operaciones
   */
  private async ensureStorageReady(): Promise<void> {
    await this.storageReady;
    if (!this.storage) {
      throw new Error('Storage no está disponible');
    }
  }

  /**
   * Carga todos los pacientes del Storage
   */
  private async cargarPacientesDelStorage() {
    try {
      let pacientes = await this.storage?.get('pacientes');
      
      // Si no hay pacientes, cargar datos por defecto
      if (!pacientes || pacientes.length === 0) {
        pacientes = [
          { id: 1, nombre: 'Ana María Soto', rut: '19.456.789-K', piso: 3, turno: 'Mañana' },
          { id: 2, nombre: 'Roberto González', rut: '15.123.456-7', piso: 5, turno: 'Tarde' },
          { id: 3, nombre: 'Javier Fuentes', rut: '18.987.654-2', piso: 1, turno: 'Noche' },
          { id: 4, nombre: 'Laura Pérez', rut: '20.555.111-9', piso: 3, turno: 'Mañana' }
        ];
        await this.storage?.set('pacientes', pacientes);
        this.nextId = 5;
      } else {
        // Calcular el siguiente ID disponible
        const maxId = Math.max(...pacientes.map((p: Paciente) => p.id));
        this.nextId = maxId + 1;
      }
      
      this.pacientesSubject.next(pacientes);
      console.log('✅ Pacientes cargados del Storage:', pacientes);
    } catch (error) {
      console.error('❌ Error al cargar pacientes del Storage:', error);
    }
  }

  /**
   * Obtener todos los pacientes (Síncrono)
   */
  obtenerPacientes(): Paciente[] {
    return this.pacientesSubject.value;
  }

  /**
   * Obtener observable de pacientes (Para componentes reactivos)
   */
  getPacientes$(): Observable<Paciente[]> {
    return this.pacientes$;
  }

  /**
   * Obtener un paciente por ID
   */
  obtenerPacienteById(id: number): Paciente | undefined {
    return this.pacientesSubject.value.find(p => p.id === id);
  }

  /**
   * Crear un nuevo paciente
   */
  async crearPaciente(paciente: Omit<Paciente, 'id'>): Promise<Paciente> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      const nuevoPaciente: Paciente = {
        ...paciente,
        id: this.nextId++
      };

      const pacientes = this.pacientesSubject.value;
      pacientes.push(nuevoPaciente);
      await this.storage!.set('pacientes', pacientes);
      
      this.pacientesSubject.next([...pacientes]);
      console.log('✅ Paciente creado y guardado:', nuevoPaciente);
      
      return nuevoPaciente;
    } catch (error) {
      console.error('❌ Error al crear paciente:', error);
      throw error;
    }
  }

  /**
   * Actualizar un paciente existente
   */
  async actualizarPaciente(id: number, datosActualizados: Partial<Paciente>): Promise<Paciente> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      const pacientes = this.pacientesSubject.value;
      const index = pacientes.findIndex(p => p.id === id);

      if (index === -1) {
        throw new Error(`Paciente con ID ${id} no encontrado`);
      }

      pacientes[index] = { ...pacientes[index], ...datosActualizados };
      await this.storage!.set('pacientes', pacientes);
      
      this.pacientesSubject.next([...pacientes]);
      console.log('✅ Paciente actualizado y guardado:', pacientes[index]);
      
      return pacientes[index];
    } catch (error) {
      console.error('❌ Error al actualizar paciente:', error);
      throw error;
    }
  }

  /**
   * Eliminar un paciente
   */
  async eliminarPaciente(id: number): Promise<void> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      let pacientes = this.pacientesSubject.value;
      const pacienteAEliminar = pacientes.find(p => p.id === id);
      
      pacientes = pacientes.filter(p => p.id !== id);
      await this.storage!.set('pacientes', pacientes);
      
      this.pacientesSubject.next([...pacientes]);
      console.log('✅ Paciente eliminado:', pacienteAEliminar);
    } catch (error) {
      console.error('❌ Error al eliminar paciente:', error);
      throw error;
    }
  }

  /**
   * Limpiar todos los pacientes (para testing)
   */
  async limpiarTodos(): Promise<void> {
    try {
      await this.storage?.remove('pacientes');
      this.nextId = 5;
      this.pacientesSubject.next([]);
      console.log('✅ Todos los pacientes eliminados');
    } catch (error) {
      console.error('❌ Error al limpiar pacientes:', error);
    }
  }
}
