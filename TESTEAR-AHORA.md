# 🎬 TUTORIAL: Cómo Testear la Persistencia - Paso a Paso EXACTO

**Duración Total**: 15-20 minutos  
**Dificultad**: ⭐ (muy fácil, solo seguir instrucciones)  
**Resultado**: Verificar que la persistencia funciona 100%

---

## ⚠️ IMPORTANTE ANTES DE EMPEZAR

**El problema que teníamos**:
- Cuando creabas un paciente y refrescabas la página, **desaparecía** 🚫
- Los datos NO se guardaban en Storage

**Lo que se arregló**:
- Agregué `IonicStorageModule` en `main.ts`
- AppComponent ahora inyecta los servicios
- **Ahora los datos SÍ persisten** ✅

---

## 🔍 VERIFICACIÓN #1: En el navegador (WEB)

### Paso 1.1: Abre la carpeta del proyecto

```powershell
# Abre PowerShell en Windows
cd G:\Esculappmed
```

### Paso 1.2: Inicia el servidor de desarrollo

```powershell
ionic serve
```

**Resultado esperado**:
- Se abre automáticamente `http://localhost:8100` en el navegador
- La app carga

### Paso 1.3: Abre DevTools (F12)

Presiona **F12** para abrir las herramientas del desarrollador

Deberías ver algo como esto en la consola:

```
✅ App inicializada - Storage listo
✅ PacienteService: Storage inicializado
✅ MedicamentoService: Storage inicializado
📦 4 pacientes recuperados del Storage
📦 4 medicamentos recuperados del Storage
```

**Si YES ✅**: Vamos bien, Storage se inicializó correctamente

**Si NO ❌**: Hay un problema, dime exactamente qué ves en la consola

### Paso 1.4: Login

1. **Email**: `admin@mail.com`
2. **Contraseña**: `123456`
3. Clic en **"Iniciar Sesión"**

**Resultado esperado**:
- Inicia sesión exitosamente
- Ves la pantalla principal con tabs

### Paso 1.5: Navega a "Home" o "Listado"

Clic en la pestaña que tenga el listado de pacientes

**Deberías ver**:
- Ana María Soto
- Roberto González
- Javier Fuentes
- Laura Pérez

(4 pacientes por defecto)

### Paso 1.6: Verifica Storage en DevTools

1. Presiona **F12** si no está abierto
2. Ve a la pestaña **"Application"** (o **"Storage"** en Firefox)
3. En la barra izquierda, expande:
   ```
   Storage → IndexedDB → _ionicstorage
   ```
4. Haz clic en la key **`pacientes`**

**Deberías ver**:
- 4 registros (objetos) con los pacientes

```javascript
[
  { id: 1, nombre: 'Ana María Soto', rut: '19.456.789-K', piso: 3, turno: 'Mañana' },
  { id: 2, nombre: 'Roberto González', rut: '15.123.456-7', piso: 5, turno: 'Tarde' },
  { id: 3, nombre: 'Javier Fuentes', rut: '18.987.654-2', piso: 1, turno: 'Noche' },
  { id: 4, nombre: 'Laura Pérez', rut: '20.555.111-9', piso: 3, turno: 'Mañana' }
]
```

✅ **Si ves esto, Storage está funcionando correctamente**

---

## 🎯 TEST #1: CREATE + Persistencia (Crear paciente y verificar que persista)

### Paso 2.1: Crea un nuevo paciente

1. Navega al tab **"Nuevo Paciente"**
2. Llena el formulario:
   ```
   Nombre: Mario Flores
   RUT: 16.234.567-8
   Email: mario@mail.com
   Dirección: Calle Principal 456
   Piso: 2
   Turno: Tarde
   ```
3. Clic en **"Agregar Paciente"**

### Paso 2.2: Verifica en la consola

Abre **DevTools (F12)** y mira la consola

**Deberías ver**:
```
✅ Paciente creado y guardado: {id: 5, nombre: 'Mario Flores', ...}
```

**Si ves esto ✅**: El paciente se creó correctamente

**Si NO lo ves ❌**: Hay un problema, dime qué error aparece

### Paso 2.3: Verifica en el listado

1. Navega a **"Home"** o **"Listado"**
2. Deberías ver **"Mario Flores"** en la lista

**Cuenta los pacientes**:
- Antes: 4
- Ahora: **5** ✅

### Paso 2.4: Verifica en Storage (DevTools)

1. **F12** → **Application** → **Storage** → **IndexedDB** → **_ionicstorage**
2. Haz clic en key **`pacientes`**

**Deberías ver**:
- **5 registros** en lugar de 4
- El último es Mario Flores con ID: 5

### Paso 2.5: ⚡ LA PRUEBA CRÍTICA: Recarga la página

1. Presiona **F5** (o Ctrl+R) para recargar
2. Vuelve a hacer login:
   ```
   admin@mail.com / 123456
   ```
3. Navega al listado

**🎉 PREGUNTA CRÍTICA**:
- ¿Sigue ahí **"Mario Flores"**?

**Si SÍ ✅**:
```
¡¡¡ FUNCIONAAAAA !!! 
La persistencia está funcionando correctamente.
Mario Flores se guardó en Storage y no desapareció tras recargar.
```

**Si NO ❌**:
```
Hay un problema. Mario Flores debería estar ahí.
Dime exactamente qué ves en el listado después de recargar.
```

---

## 🎯 TEST #2: UPDATE (Editar paciente)

### Paso 3.1: Edita a Mario Flores

1. Desde el listado, clic en **"Mario Flores"**
2. Verás la pantalla de detalle
3. **Cambia el nombre**:
   - De: `Mario Flores`
   - A: `Mario Carlos Flores`
4. **Cambia el piso**:
   - De: `2`
   - A: `4`
5. Clic en **"Guardar Cambios"**

### Paso 3.2: Verifica en la consola

**Deberías ver**:
```
✅ Paciente actualizado y guardado: {id: 5, nombre: 'Mario Carlos Flores', piso: 4, ...}
```

### Paso 3.3: Recarga la página (F5)

1. Presiona **F5**
2. Login de nuevo
3. Navega al listado

**¿Ves a "Mario Carlos Flores" con piso 4?** ✅

**Si SÍ**: UPDATE (editar) funciona correctamente ✅

**Si NO**: UPDATE no está funcionando ❌

---

## 🎯 TEST #3: DELETE (Eliminar paciente)

### Paso 4.1: Elimina a Mario Carlos Flores

1. Desde el listado, clic en **"Mario Carlos Flores"**
2. Scroll abajo hasta encontrar el botón **"Eliminar Paciente"**
3. Clic en **"Eliminar Paciente"**
4. Se abre un diálogo, clic en **"Sí, eliminar"**

### Paso 4.2: Verifica en la consola

**Deberías ver**:
```
✅ Paciente eliminado del Storage: {id: 5, nombre: 'Mario Carlos Flores', ...}
```

### Paso 4.3: Verifica en el listado

- **Mario Carlos Flores debería desaparecer** inmediatamente
- Ahora deberías ver solo **4 pacientes**

### Paso 4.4: ⚡ Recarga la página (F5) - Prueba crítica

1. Presiona **F5**
2. Login nuevamente
3. Navega al listado

**¿Sigue desaparecido "Mario Carlos Flores"?** ✅

**Si SÍ**: DELETE (eliminar) funciona correctamente ✅

**Si NO (aparece nuevamente)**: DELETE no persiste correctamente ❌

---

## 📱 PARTE 2: Verificación en ANDROID (Más importante aún)

### Paso 5.1: Prepara todo

```powershell
# En PowerShell en la carpeta del proyecto
npm run build
```

Espera a que termine (verás "Output location: ...www")

### Paso 5.2: Sincroniza con Android

```powershell
npx cap copy android
npx cap sync android
```

### Paso 5.3: Abre Android Studio

```powershell
npx cap open android
```

Espera a que Android Studio se abra

### Paso 5.4: Crea o abre un emulador

1. En Android Studio, ve a **Tools → Device Manager**
2. Si no tienes un emulador:
   - Clic en **"Create device"**
   - Selecciona **Pixel 5**
   - Selecciona **Android 13 (Tiramisu)**
   - Clic en **Create**
3. Inicia el emulador (botón ▶️)

Espera a que cargue (puede tomar 2-3 minutos)

### Paso 5.5: Ejecuta la app

1. En Android Studio, clic en **Run → Run 'app'**
2. Selecciona el emulador creado
3. Espera a que compile y instale

### Paso 5.6: Test en Android

**En el emulador**:

1. **Login**:
   - Email: `admin@mail.com`
   - Password: `123456`

2. **Crea un paciente**:
   - Nombre: `Test Android`
   - RUT: `11.111.111-1`
   - (Llena los demás campos)
   - Clic en "Agregar Paciente"

3. **Verifica que aparece en el listado** ✅

4. **Ahora aquí viene lo importante**:
   - Presiona el botón **HOME** del emulador
   - La app se minimiza (pero no se cierra)
   - Desliza hacia arriba para **cerrar completamente la app**

5. **Reabre la app**:
   - Clic en el launcher
   - Busca "Esculappmed" y toca para abrir

6. **Login de nuevo**:
   - admin@mail.com / 123456

7. **🎉 PREGUNTA CRÍTICA**:
   - ¿Aparece **"Test Android"** en el listado?

**Si SÍ ✅**: 
```
¡¡¡ EXCELENTE !!!
La persistencia funciona en Android también.
Ese es el requisito CRÍTICO que te faltaba.
```

**Si NO ❌**:
```
Hay un problema. El paciente debería estar ahí.
Necesitamos revisar los logs en Android Studio.
```

### Paso 5.7 (Si no funciona): Revisar logs

1. En Android Studio, abre **Logcat** (parte inferior)
2. En el campo de búsqueda, escribe: `Storage`
3. Busca estos mensajes:
   ```
   ✅ Storage inicializado
   📦 pacientes recuperados
   ```

**Si ves estos mensajes ✅**: Storage funciona  
**Si NO los ves ❌**: Storage no se inicializa (hay un problema)

---

## 🌐 PARTE 3: Test API REST (Opcional)

### Paso 6.1: Navega al tab "API REST"

En la app (Web o Android), busca el tercer tab (debe decir **"API REST"** o tener un icono de nube)

Haz clic en él

### Paso 6.2: Verifica conexión

**Deberías ver**:
```
Estado de API
Endpoint: jsonplaceholder.typicode.com
Estado: 🟢 Conectado
```

**Si dice "Conectado" ✅**: La API funciona

**Si dice "Sin conexión" ❌**: Hay un problema de red

### Paso 6.3: Test GET

En la pantalla de API REST, verás una lista de usuarios

**Deberías ver**:
1. Leanne Graham
2. Ervin Howell
3. Clementine Bauch
4. Patricia Lebsack
5. Chelsey Dietrich

**Si ves esto ✅**: GET /users funciona

### Paso 6.4: Test POST

1. Clic en botón **"POST - Crear Usuario"**
2. Se abre un diálogo con campos:
   - Nombre
   - Email
   - Teléfono
3. Llena con datos ficticios:
   ```
   Nombre: Test User
   Email: test@mail.com
   Teléfono: 123456
   ```
4. Clic en **"Crear"**

**Deberías ver**:
```
✅ Usuario creado con ID: 11
```

**Si ves esto ✅**: POST funciona

### Paso 6.5: Test PUT

1. Clic en el botón **"PUT"** de cualquier usuario
2. Se abre un diálogo
3. Cambia el nombre
4. Clic en **"Actualizar"**

**Deberías ver**:
```
✅ Usuario X actualizado
```

**Si ves esto ✅**: PUT funciona

### Paso 6.6: Test DELETE

1. Clic en el botón rojo **"DELETE"** de cualquier usuario
2. Confirma en el diálogo

**Deberías ver**:
```
✅ Usuario X eliminado
```

Y el usuario debe **desaparecer de la lista** inmediatamente

**Si ves esto ✅**: DELETE funciona

---

## ✅ RESUMEN FINAL

### Si TODOS los tests pasaron:

```
✅ CREATE (crear) funciona + persiste
✅ READ (leer) funciona después de recargar
✅ UPDATE (editar) persiste cambios
✅ DELETE (eliminar) persiste eliminación
✅ Funciona en WEB (navegador)
✅ Funciona en ANDROID (emulador o físico)
✅ API REST implementada (GET/POST/PUT/DELETE)
✅ Eximición conseguida (10.0/10)

Tu calificación: 10.0/10 🎉
```

### Si algunos tests NO pasaron:

Dime exactamente cuál NO funciona y te ayudaré a arreglarlo.

---

## 🆘 PROBLEMAS COMUNES

### Problema 1: "Storage no está disponible"

**Síntoma**: Error en consola que dice "Storage undefined"

**Solución**:
```powershell
# Asegúrate de que main.ts tiene:
# import { IonicStorageModule } from '@ionic/storage-angular';
# importProvidersFrom(IonicStorageModule.forRoot())

# Si no, edita src/main.ts y agrega esas líneas
```

### Problema 2: "Los datos no persisten en Android"

**Síntoma**: Creas un paciente, cierras la app, abres y no está

**Solución**:
```powershell
# Revisa los logs
adb logcat | grep -i storage

# Si ves errores, reporta exactamente qué dice
```

### Problema 3: "API REST no conecta"

**Síntoma**: Dice "Sin conexión" en el tab de API REST

**Solución**:
- En Android Studio, ve a AVD Manager
- Edita el emulador
- Verifica que "Network" esté habilitado
- Reinicia el emulador

---

## 📞 CÓMO REPORTAR PROBLEMAS

Si algo no funciona:

1. **Captura exactamente qué ves** (screenshot)
2. **Abre DevTools (F12)** y copia lo que dice en la consola
3. **Dime cuál test falló** (CREATE, READ, UPDATE, DELETE, Android, API REST)
4. **Cuéntame qué paso esperabas** vs **qué viste realmente**

---

## ⏱️ Timeline estimado

- **Verificación web**: 5 minutos
- **Test CREATE/UPDATE/DELETE**: 8 minutos
- **Preparación Android**: 5 minutos
- **Test en Android**: 5 minutos
- **Test API REST**: 3 minutos

**Total**: 26 minutos máximo

---

## 🎯 ¿POR QUÉ ESTO ES IMPORTANTE?

Antes de los arreglos:
- Creabas un paciente → **Desaparecía** al recargar ❌

Después de los arreglos:
- Creas un paciente → **Persiste** tras recargar ✅
- Editas → Los cambios se guardan ✅
- Eliminas → La eliminación persiste ✅

Esto es lo que **vale 40% de tu nota**. Sin esto, máximo 4.3/10.

Con esto funcionando: **8.9/10** con solo un poco de práctica de teoría.

---

**¡Vamos! A testear ahora mismo. 🚀**
