import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  constructor() {}

  async setValue<T>(key: string, value: T): Promise<void> {
    try {
      await Preferences.set({ key, value: JSON.stringify(value) });
    } catch (error) {
      console.error(`[PreferencesService] Error al guardar ${key}:`, error);
    }
  }

  async getValue<T>(key: string): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key });
      if (!value) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        console.warn(`[PreferencesService] Valor no JSON para ${key}`);
        return null;
      }
    } catch (error) {
      console.error(`[PreferencesService] Error al obtener ${key}:`, error);
      return null;
    }
  }

  async removeValue(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error(`[PreferencesService] Error al eliminar ${key}:`, error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('[PreferencesService] Error al limpiar todas las claves:', error);
    }
  }
}