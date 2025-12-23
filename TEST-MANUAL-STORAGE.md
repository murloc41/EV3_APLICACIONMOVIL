# 🧪 TEST MANUAL: Verificar si Storage realmente guarda

## Estado Actual

✅ Patrón regex FUNCIONA con todos los RUT
✅ PacienteService tiene métodos crearPaciente, actualizarPaciente, eliminarPaciente
✅ Storage está configurado en main.ts
✅ Services están inyectados en app.component.ts

**PERO**: El usuario reporta que no puede editar/eliminar

---

## 🔍 TEST QUE NECESITO HACER

### En el navegador (más fácil para debuggear):

```
1. Abre http://localhost:8100
2. F12 (DevTools) → Console
3. Login: admin@mail.com / 123456
4. Ir a Pacientes

EN CONSOLA BUSCA ESTOS LOGS:
✅ "PacienteService: Storage inicializado"  
✅ "Pacientes cargados del Storage: [...]"

5. Click en "Ana María Soto"
6. EN CONSOLA VE:
✅ "Cargando paciente: {id: 1, nombre: 'Ana María Soto', ...}"
✅ "Formulario inicializado. Válido: true"

IMPORTANTE: ¿Está el botón "Guardar Cambios" VERDE o GRIS?
- VERDE = formulario es válido
- GRIS = formulario es inválido (error de validación)

7. Si VERDE: Cambiar turno a "Tarde" y clickear "Guardar Cambios"
8. EN CONSOLA BUSCA:
💾 "Intentando guardar cambios..."
✅ "Paciente actualizado exitosamente. ID: 1"

Si ves estos logs → Storage SÍ está guardando

9. Click volver a "Pacientes" y ver si aparece "Ana María" con turno "Tarde"
10. F5 (recargar página)
11. Login nuevamente
12. Ir a Pacientes - ¿Aparece "Ana María" con turno "Tarde"?

SI APARECE = PERSISTENCIA FUNCIONA ✅
SI NO APARECE = PERSISTENCIA NO FUNCIONA ❌
```

### En el emulador Android:

Hacer los mismos pasos pero mirando **Logcat** en lugar de Console:

```
Android Studio → Logcat (pestaña inferior)
Filtro: "Paciente" o "Storage"

Buscar estos logs:
I PacienteService: Storage inicializado
I Pacientes cargados del Storage
I Paciente actualizado exitosamente
```

---

## 🚨 PROBLEMAS POSIBLES Y SOLUCIONES

### Problema #1: Botón "Guardar Cambios" sigue GRIS

**Síntomas**:
- ❌ "Formulario inicializado. Válido: false"
- ❌ "❌ Campo 'X' inválido: ..."

**Causa posible**:
El campo que falla en validación. Revisar cuál es:

```
Si falla 'nombre': Muy corto (mín 3 caracteres)
Si falla 'idPaciente': RUT no coincide con patrón
Si falla 'piso': Menor a 1 o es 0
Si falla 'turno': No seleccionado
```

**Solución**:
Simplificar validadores. Por ejemplo:
```typescript
// En detalle.page.ts
nombre: [this.pacienteActual.nombre, Validators.required], // Sin minLength
piso: [this.pacienteActual.piso], // Sin validadores
```

### Problema #2: Botón se activa pero NO guarda

**Síntomas**:
- ✅ Botón es VERDE
- ✅ Cambias turno
- ✅ Clickeas "Guardar"
- ❌ **NO aparecen logs** "Intentando guardar..."
- ❌ Vuelves a lista y el turno NO cambió

**Causa posible**:
La función `guardarCambios()` NO se está ejecutando. Revisar:
- ¿El botón tiene `(click)` en el HTML?
- ¿El método existe en el .ts?
- ¿El formulario tiene `(ngSubmit)`?

**Solución**:
```html
<!-- CORRECTO: -->
<form [formGroup]="pacienteForm" (ngSubmit)="guardarCambios()">
  ...
  <ion-button type="submit" [disabled]="pacienteForm.invalid">
    Guardar Cambios
  </ion-button>
</form>

<!-- O ALTERNATIVA: -->
<ion-button (click)="guardarCambios()" [disabled]="pacienteForm.invalid">
  Guardar Cambios
</ion-button>
```

### Problema #3: Logs aparecen pero Storage NO guarda

**Síntomas**:
- ✅ "Intentando guardar cambios..."
- ✅ "Paciente actualizado exitosamente"
- ❌ F5 y recarga
- ❌ Turno está como antes

**Causa posible**:
Storage.set() falla silenciosamente. Revisar:
- ¿Storage está realmente inicializado?
- ¿ensureStorageReady() está completando?
- ¿El Storage.set() retorna promesa?

**Solución**:
```typescript
async actualizarPaciente(id, datos) {
  await this.ensureStorageReady(); // ← ESPERAR
  
  try {
    const pacientes = this.pacientesSubject.value;
    const index = pacientes.findIndex(p => p.id === id);
    pacientes[index] = { ...pacientes[index], ...datos };
    
    console.log('Antes de guardar:', pacientes); // DEBUG
    await this.storage!.set('pacientes', pacientes); // ← AWAIT
    console.log('Después de guardar'); // DEBUG
    
    this.pacientesSubject.next([...pacientes]); // NOTIFICAR
  } catch (error) {
    console.error('ERROR AL GUARDAR:', error); // VER ERROR
  }
}
```

---

## 📊 CHECKLIST DE DEBUG

Antes de decir "necesito Firebase":

- [ ] ¿Abre el navegador web a http://localhost:8100 o emulador?
- [ ] ¿Ve los logs iniciales "Storage inicializado"?
- [ ] ¿Puede cargar un paciente sin errores?
- [ ] ¿El botón "Guardar Cambios" está VERDE al cargar?
- [ ] ¿Puede cambiar el turno sin errores?
- [ ] ¿Al clickear "Guardar" ve el log "Intentando guardar"?
- [ ] ¿Vuelve a la lista y ve el turno actualizado?
- [ ] ¿F5 (recargar) y el turno PERSISTE?

Si TODAS son SÍ → Storage FUNCIONA (no necesita Firebase)

Si ALGUNA es NO → Reporta cuál falla y dónde está el error

---

## 🎯 MI PROPUESTA

Te voy a pedir que hagas esto:

1. **AHORA**: Ejecuta `npx ionic serve` en una terminal
2. **Abre** http://localhost:8100 en navegador
3. **F12** y ve a Console
4. **Reportame**:
   - ¿Qué logs ves?
   - ¿Puedes ir a editar un paciente?
   - ¿El botón "Guardar Cambios" está verde o gris?
   - ¿Qué pasa cuando intentas guardar (qué logs ves)?

Con esa información podré **exactamente** decirte qué está mal y cómo arreglarlo.

**No asumas nada sin testear primero.**
