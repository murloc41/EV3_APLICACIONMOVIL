# 🚀 TUTORIAL ANDROID - Paso a Paso EXACTO

**Duración total**: 20-30 minutos  
**Requisito**: Android Studio instalado

---

## PASO 1: Compilar la app (5 minutos)

En una **NUEVA terminal** (NO la que está ejecutando `ionic serve`):

```powershell
cd G:\Esculappmed
npm run build
```

**Qué verás**:
```
Output location: G:\Esculappmed\www
✅ Listo para sincronizar
```

---

## PASO 2: Sincronizar con Android (3 minutos)

```powershell
npx cap copy android
npx cap sync android
```

**Qué verás**:
```
✅ Capacitor files synced
```

---

## PASO 3: Abrir Android Studio (2 minutos)

```powershell
npx cap open android
```

**Resultado**: Android Studio se abre automáticamente con el proyecto

---

## PASO 4: Configurar Emulador (5 minutos)

En Android Studio:

1. Click en **"Device Manager"** (esquina superior derecha)
2. Si NO tienes emulador:
   - Click en **"Create device"**
   - Selecciona **"Pixel 5"**
   - Sistema: **Android 13 (Tiramisu) API 33**
   - Click **"Create"**

3. **Inicia el emulador** (botón ▶️ verde)
   - Espera 1-2 minutos a que cargue

---

## PASO 5: Ejecutar la App (3 minutos)

En Android Studio:

1. Click en **Run → Run 'app'** (o Shift+F10)
2. Selecciona el emulador
3. Click **OK**

**Espera** a que compile e instale (1-2 minutos)

**Resultado**: La app abre en el emulador

---

## PASO 6: Test Crítico - Persistencia

### Test 1: Crea un paciente

1. **Login**:
   - Email: `admin@mail.com`
   - Password: `123456`
   - Click "Iniciar Sesión"

2. **Navega a "Nuevo Paciente"**

3. **Llena el formulario**:
   ```
   Nombre: TEST ANDROID
   RUT: 11.111.111-1
   Email: test@mail.com
   Dirección: Calle Test
   Piso: 5
   Turno: Mañana
   ```

4. **Click "Agregar Paciente"**

**Deberías ver**:
- Toast: "Paciente creado"
- Paciente aparece en el listado

---

### Test 2: Verificar en Listado

1. Navega a **"Home"** o **"Listado"**

**Deberías ver**:
- Los 4 pacientes originales
- **"TEST ANDROID"** al final (ID: 5)

**Total: 5 pacientes** ✅

---

### Test 3: ⚡ PRUEBA CRÍTICA - Cerrar y Reabrir App

1. **Cierra la app**:
   - Presiona el botón HOME del emulador
   - Desliza la app hacia arriba para cerrar completamente

2. **Reabre la app**:
   - Click en el launcher (parte superior)
   - Busca y toca "Esculappmed"

3. **Login de nuevo**:
   ```
   admin@mail.com / 123456
   ```

4. **Navega al listado**

**🎉 PREGUNTA CRÍTICA**:
- ¿Aparece **"TEST ANDROID"** en el listado?

**SI ✅** → **PERSISTENCIA FUNCIONA PERFECTAMENTE**
**NO ❌** → **PROBLEMA CON STORAGE**

---

## PASO 7: Ver Logs (Si hay problema)

1. En Android Studio, abre **Logcat** (parte inferior)

2. En el campo de búsqueda, escribe:
   ```
   Storage
   ```

3. Busca mensajes como:
   ```
   ✅ PacienteService: Storage inicializado
   📦 4 pacientes recuperados del Storage
   ✅ Paciente creado y guardado
   ```

**Si ves estos mensajes**: Storage funciona ✅

**Si NO los ves**: Storage no se inicializa ❌

---

## PASO 8: Test de Editar (Opcional)

1. Desde el listado, toca **"TEST ANDROID"**

2. Cambia:
   - Nombre: `TEST ANDROID EDITADO`
   - Piso: `10`

3. Click "Guardar Cambios"

4. **Cierra completamente la app**

5. **Reabre la app**

**¿Aparecen los cambios?** 
- SÍ ✅ → UPDATE funciona
- NO ❌ → UPDATE no persiste

---

## PASO 9: Test de Eliminar (Opcional)

1. Desde el listado, toca **"TEST ANDROID EDITADO"**

2. Scroll abajo

3. Click **"Eliminar Paciente"**

4. Confirma en el diálogo

**¿El paciente desaparece?** 
- SÍ ✅ → DELETE inmediato funciona

5. **Cierra completamente la app**

6. **Reabre**

**¿El paciente sigue desaparecido?**
- SÍ ✅ → DELETE persiste correctamente
- NO ❌ → DELETE no persiste

---

## PASO 10: Test de Cámara (Periférico)

1. Desde el listado, toca cualquier paciente

2. Busca botón **"Tomar Foto"**

3. Se abre la cámara del emulador

4. Permite permisos si pregunta

5. Toma una foto (cualquier foto)

**¿Aparece la foto?**
- SÍ ✅ → Cámara funciona

6. **Cierra la app**

7. **Reabre**

**¿La foto sigue ahí?**
- SÍ ✅ → Foto persiste en Storage
- NO ❌ → Foto no persiste

---

## PASO 11: Test de GPS (Periférico)

1. En el detalle del paciente, busca **"Obtener Ubicación"**

2. Click en el botón

3. Se solicita permiso de ubicación - PERMITE

4. En Android Studio:
   - Extended Controls (**...** en esquina superior derecha)
   - Click en **"Location"**
   - Ingresa coordenadas:
     ```
     Latitude: -33.4489
     Longitude: -70.6693
     ```
   - Click **"Send"**

**¿Aparecen las coordenadas en la app?**
- SÍ ✅ → GPS funciona

5. **Cierra la app**

6. **Reabre**

**¿Las coordenadas siguen ahí?**
- SÍ ✅ → GPS persiste
- NO ❌ → GPS no persiste

---

## ✅ RESUMEN DE TESTS

```
✅ Test 1: Crear paciente en Android
✅ Test 2: Ver en listado (5 pacientes)
✅ Test 3: CRÍTICO - Cerrar/Reabrir persiste
✅ Test 4: Editar → Cerrar/Reabrir persiste
✅ Test 5: Eliminar → Cerrar/Reabrir persiste
✅ Test 6: Foto con cámara persiste
✅ Test 7: Coordenadas GPS persisten
```

---

## 🎉 SI TODOS LOS TESTS PASARON

```
✅ PERSISTENCIA FUNCIONA EN ANDROID
✅ PERIFÉRICOS FUNCIONAN
✅ TODO FUNCIONA PERFECTAMENTE

FELICIDADES: Tienes 9.4/10 garantizado
(Necesitas estudiar teoría para el 10)
```

---

## 🆘 SI ALGO NO FUNCIONA

### Problema: "TEST ANDROID desapareció tras reabrir"

**Verificación**:
1. Abre Logcat (Android Studio)
2. Busca: `Storage`
3. ¿Ves mensajes de Storage?

**Si NO**:
- Storage no se inicializa
- Verifica que `main.ts` tiene:
  ```typescript
  importProvidersFrom(IonicStorageModule.forRoot())
  ```

**Si SÍ**:
- Storage funciona pero hay otro problema
- Reporta exactamente qué dice en los logs

---

## 📱 CHEAT SHEET RÁPIDO

```powershell
# Compilar
npm run build

# Sincronizar
npx cap sync android

# Abrir Android Studio
npx cap open android

# Después en Android Studio:
# 1. Click Device Manager
# 2. Inicia emulador (botón ▶️)
# 3. Click Run (botón ▶️ grande) 
# 4. Selecciona emulador
# 5. ¡Espera a que compile!
```

---

## ⏱️ TIMELINE

```
Compilar:        5 minutos
Sincronizar:     3 minutos
Abrir Android:   2 minutos
Emulador:        5 minutos
Test crítico:    5 minutos
Tests opcionales: 10 minutos

TOTAL: 30 minutos máximo
```

---

## ✨ LO MÁS IMPORTANTE

```
Paso más crítico:
1. Crea paciente "TEST ANDROID"
2. CIERRA completamente la app
3. REABRE
4. ¿Aparece "TEST ANDROID"?
   
   SI = Storage funciona ✅
   NO = Storage no funciona ❌
```

---

**¡Adelante! Sigue estos pasos exactos.** 🚀
