# ⚡ INSTRUCCIONES FINALES - TESTEA AHORA EN ANDROID

**Status actual**: ✅ Todo compilado y listo  
**Siguiente**: Testear en Android Studio

---

## 🎯 OPCIÓN MÁS RÁPIDA (Script automático)

### Paso 1: Abre PowerShell en G:\Esculappmed

```powershell
cd G:\Esculappmed
.\compilar-android.bat
```

**Qué pasa**:
- ✅ Compila la app
- ✅ Sincroniza con Android
- ✅ Abre Android Studio automáticamente

---

## 🎯 OPCIÓN MANUAL (Paso a paso)

### Paso 1: Compila (Nueva terminal, NO la de ionic serve)

```powershell
cd G:\Esculappmed
npm run build
```

Espera a que termine (~30 segundos)

**Verás**:
```
Output location: G:\Esculappmed\www
```

---

### Paso 2: Sincroniza con Android

```powershell
npx cap copy android
npx cap sync android
```

**Verás**:
```
✅ Capacitor files synced
```

---

### Paso 3: Abre Android Studio

```powershell
npx cap open android
```

**Qué pasa**: Android Studio se abre sola con el proyecto

---

## 📱 DENTRO DE ANDROID STUDIO

### Paso 4: Configura emulador (Primera vez solo)

1. **Click en "Device Manager"** (esquina superior derecha)

2. **Si NO tienes emulador**:
   - Click **"Create device"**
   - Nombre: `Pixel5` 
   - Hardware: **Pixel 5**
   - Sistema: **Android 13 (API 33)**
   - Click **"Next"** → **"Finish"** → **"Create"**

3. **Inicia el emulador**:
   - Busca tu emulador en la lista
   - Click botón **▶️ (Play verde)**
   - Espera 1-2 minutos

---

### Paso 5: Ejecuta la app

1. **Click en "Run"** (botón ▶️ grande en toolbar, o Shift+F10)

2. **Selecciona el emulador** de la lista

3. **Click "OK"**

4. **Espera** a que compile (1-2 minutos)

---

## 🧪 TEST CRÍTICO (ESTO ES LO IMPORTANTE)

**Una vez que la app se abre en el emulador**:

### 1. Login
```
Email: admin@mail.com
Password: 123456
Click "Iniciar Sesión"
```

### 2. Crear paciente
```
Click: "Nuevo Paciente"
Nombre: TEST ANDROID
RUT: 11.111.111-1
Email: test@mail.com
Dirección: Av Test
Piso: 5
Turno: Mañana
Click: "Agregar Paciente"
```

### 3. Verificar en listado
```
Click: "Home" o "Listado"
¿Ves "TEST ANDROID" con ID 5? 
→ Deberías ver 5 pacientes totales (antes había 4)
```

### 4. ⚡ PRUEBA CRÍTICA (Persistencia)

1. **En el emulador**:
   - Presiona botón **HOME** (círculo, parte inferior)
   - Desliza la app hacia arriba para cerrar

2. **Reabre la app**:
   - Click en launcher/app grid
   - Busca "Esculappmed"
   - Toca el icono

3. **Login de nuevo**:
   ```
   admin@mail.com / 123456
   ```

4. **Navega al listado**

### 5. 🎉 LA PREGUNTA DEFINITIVA

**¿Aparece "TEST ANDROID" en el listado?**

```
SI ✅  → PERSISTENCIA FUNCIONA PERFECTAMENTE
       → Felicidades, tienes 9.4/10 asegurado

NO ❌  → PERSISTENCIA NO FUNCIONA
       → Abre Logcat en Android Studio
       → Busca "Storage"
       → Manda el error
```

---

## 📍 LOGCAT (Si hay problema)

En Android Studio:

1. **Logcat** (parte inferior)
2. **Campo de búsqueda**: escribe `Storage`
3. Busca mensajes:
   ```
   ✅ PacienteService: Storage inicializado
   📦 4 pacientes recuperados
   ✅ Paciente creado y guardado
   ```

**Si ves estos**: Storage funciona ✅
**Si NO los ves**: Storage no se inicia ❌

---

## ✅ TESTS SECUNDARIOS (Opcionales)

### Test: Editar
1. Click en "TEST ANDROID"
2. Cambiar nombre a: "TEST EDITADO"
3. Cambiar piso a: 10
4. Click "Guardar"
5. Cerrar app completamente
6. Reabrir
7. ¿Se ven los cambios? SÍ = ✅

### Test: Eliminar
1. Click en "TEST EDITADO"
2. Scroll abajo
3. Click "Eliminar"
4. Confirmar
5. Debe desaparecer inmediatamente
6. Cerrar app
7. Reabrir
8. ¿Sigue desaparecido? SÍ = ✅

### Test: Cámara
1. Click en cualquier paciente
2. Click "Tomar Foto"
3. Toma foto
4. ¿Aparece? SÍ = ✅
5. Cerrar app → Reabrir
6. ¿Foto persiste? SÍ = ✅

### Test: GPS
1. Click en paciente
2. Click "Obtener Ubicación"
3. Permite permisos
4. En Android Studio: Extended Controls → Location
5. Latitude: -33.4489
6. Longitude: -70.6693
7. Click "Send"
8. ¿Aparecen coords? SÍ = ✅
9. Cerrar app → Reabrir
10. ¿Coords persisten? SÍ = ✅

---

## ⏱️ TIMELINE

```
Compilar:         5 min
Sincronizar:      3 min
Android Studio:   2 min
Emulador:         5 min
Test crítico:     5 min
Tests opcionales: 10 min

TOTAL: 30 minutos máximo
```

---

## 🎬 RESUMEN EN 3 PASOS

```
1. compilar-android.bat
   (Automático - espera a que abra Android Studio)

2. En Android Studio:
   - Device Manager → Crea/Inicia emulador
   - Run (botón ▶️)

3. En emulador:
   - Login
   - Crear "TEST ANDROID"
   - CERRAR app completamente
   - REABRIR
   - ¿Aparece "TEST ANDROID"?
     SÍ = ✅ FUNCIONA
     NO = ❌ PROBLEMA
```

---

## 🔗 REFERENCIA

**Para detalles**: Lee `ANDROID-TESTING.md` en el repo

**Para problemas**: Consulta sección "Troubleshooting" de `ANDROID-TESTING.md`

---

## ✨ DATO IMPORTANTE

```
Ionic serve (navegador): 
✅ Ya está funcionando en http://localhost:8100

Android Studio (emulador):
⏳ Necesitas seguir estos pasos para testear
```

---

**¡Adelante! A testear en Android ahora mismo.** 🚀

Si algo no funciona, dime EXACTAMENTE qué error ves en Logcat.
