import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Medicamento {
  id: number;
  nombre: string;
  dosisMg: number;
  tipo: string;
  usoDelicado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private storage: Storage | null = null;
  private medicamentosSubject = new BehaviorSubject<Medicamento[]>([]);
  public medicamentos$ = this.medicamentosSubject.asObservable();
  private nextId = 105;
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
      await this.cargarMedicamentosDelStorage();
      console.log('✅ MedicamentoService: Storage inicializado');
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
   * Carga todos los medicamentos del Storage
   */
  private async cargarMedicamentosDelStorage() {
    try {
      let medicamentos = await this.storage?.get('medicamentos');
      
      // Si no hay medicamentos, cargar datos por defecto
      if (!medicamentos || medicamentos.length === 0) {
        medicamentos = [
          { id: 101, nombre: 'Amlodipino', dosisMg: 50, tipo: 'Antiinflamatorio', usoDelicado: false },
          { id: 102, nombre: 'Morfina', dosisMg: 10, tipo: 'Analgésico', usoDelicado: true },
          { id: 103, nombre: 'Amoxicilina', dosisMg: 500, tipo: 'Antibiótico', usoDelicado: false },
          { id: 104, nombre: 'Tramadol', dosisMg: 50, tipo: 'Analgésico', usoDelicado: true }
        ];
        await this.storage?.set('medicamentos', medicamentos);
        this.nextId = 105;
      } else {
        // Calcular el siguiente ID disponible
        const maxId = Math.max(...medicamentos.map((m: Medicamento) => m.id));
        this.nextId = maxId + 1;
      }
      
      this.medicamentosSubject.next(medicamentos);
      console.log('✅ Medicamentos cargados del Storage:', medicamentos);
    } catch (error) {
      console.error('❌ Error al cargar medicamentos del Storage:', error);
    }
  }

  /**
   * Obtener todos los medicamentos (Síncrono)
   */
  obtenerMedicamentos(): Medicamento[] {
    return this.medicamentosSubject.value;
  }

  /**
   * Obtener observable de medicamentos (Para componentes reactivos)
   */
  getMedicamentos$(): Observable<Medicamento[]> {
    return this.medicamentos$;
  }

  /**
   * Obtener un medicamento por ID
   */
  obtenerMedicamentoById(id: number): Medicamento | undefined {
    return this.medicamentosSubject.value.find(m => m.id === id);
  }

  /**
   * Crear un nuevo medicamento
   */
  async crearMedicamento(medicamento: Omit<Medicamento, 'id'>): Promise<Medicamento> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      const nuevoMedicamento: Medicamento = {
        ...medicamento,
        id: this.nextId++
      };

      const medicamentos = this.medicamentosSubject.value;
      medicamentos.push(nuevoMedicamento);
      await this.storage!.set('medicamentos', medicamentos);
      
      this.medicamentosSubject.next([...medicamentos]);
      console.log('✅ Medicamento creado y guardado:', nuevoMedicamento);
      
      return nuevoMedicamento;
    } catch (error) {
      console.error('❌ Error al crear medicamento:', error);
      throw error;
    }
  }

  /**
   * Actualizar un medicamento existente
   */
  async actualizarMedicamento(id: number, datosActualizados: Partial<Medicamento>): Promise<Medicamento> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      const medicamentos = this.medicamentosSubject.value;
      const index = medicamentos.findIndex(m => m.id === id);

      if (index === -1) {
        throw new Error(`Medicamento con ID ${id} no encontrado`);
      }

      medicamentos[index] = { ...medicamentos[index], ...datosActualizados };
      await this.storage!.set('medicamentos', medicamentos);
      
      this.medicamentosSubject.next([...medicamentos]);
      console.log('✅ Medicamento actualizado y guardado:', medicamentos[index]);
      
      return medicamentos[index];
    } catch (error) {
      console.error('❌ Error al actualizar medicamento:', error);
      throw error;
    }
  }

  /**
   * Eliminar un medicamento
   */
  async eliminarMedicamento(id: number): Promise<void> {
    await this.ensureStorageReady(); // ⚡ Espera a que Storage esté listo
    
    try {
      let medicamentos = this.medicamentosSubject.value;
      const medicamentoAEliminar = medicamentos.find(m => m.id === id);
      
      medicamentos = medicamentos.filter(m => m.id !== id);
      await this.storage!.set('medicamentos', medicamentos);
      
      this.medicamentosSubject.next([...medicamentos]);
      console.log('✅ Medicamento eliminado del Storage:', medicamentoAEliminar);
    } catch (error) {
      console.error('❌ Error al eliminar medicamento:', error);
      throw error;
    }
  }

  /**
   * Limpiar todos los medicamentos (para testing)
   */
  async limpiarTodos(): Promise<void> {
    try {
      await this.storage?.remove('medicamentos');
      this.nextId = 105;
      this.medicamentosSubject.next([]);
      console.log('✅ Todos los medicamentos eliminados');
    } catch (error) {
      console.error('❌ Error al limpiar medicamentos:', error);
    }
  }
}
