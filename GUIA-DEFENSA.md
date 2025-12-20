# 🎤 GUÍA FINAL PARA LA DEFENSA ORAL - EV3

**Proyecto**: Esculappmed - Aplicación Móvil Ionic  
**Evaluación**: Sumativa Unidad 3 (Consolidación, Persistencia y Defensa)  
**Estudiante**: murloc41  
**Repositorio**: https://github.com/murloc41/EV3_APLICACIONMOVIL  

---

## 📱 FLUJO DE DEMOSTRACIÓN (10-15 minutos)

### Paso 1: Login (30 segundos)
```
1. Ejecutar app en Android Studio o web
2. Pantalla de Login
   - Usuario: admin@mail.com
   - Contraseña: 123456
3. Click "Iniciar Sesión"
4. ✅ Esperado: Navega a Home (Panel de Control)
```

### Paso 2: Módulo Pacientes - CREATE (2 minutos)
```
1. Home → Click tarjeta "Pacientes"
2. Lista de pacientes (4 por defecto)
3. Click botón "+ Agregar Paciente"
4. Llenar formulario:
   - Nombre: "Carlos Martínez" (validación: minLength 3)
   - RUT: "21.234.567-8" (validación: pattern RUT chileno)
   - Piso: "2" (validación: min 1)
   - Turno: "Tarde" (select)
5. Click "Guardar"
6. ✅ Esperado: Regresa a listado y aparece el nuevo paciente
   ✅ CRÍTICO: Persistencia - Cerrar app completamente y reabrirla → Paciente sigue ahí
```

### Paso 3: Módulo Pacientes - READ (1 minuto)
```
1. Listado de Pacientes (ahora con 5 pacientes)
2. Buscar "Carlos Martínez" (usar searchbar si existe)
3. Click en el paciente
4. ✅ Esperado: Se abre detalle con datos precargados
   - Nombre, RUT, Piso, Turno
   - Si hay foto: se muestra
   - Si hay GPS: se muestra ubicación
```

### Paso 4: Periféricos - CÁMARA (2 minutos)
```
1. En detalle del paciente "Carlos Martínez"
2. Sección "Foto del Paciente (Periférico 1)"
3. Click botón "📷 Tomar Foto"
4. ✅ Se abre cámara (permiso: CAMERA en AndroidManifest.xml)
5. Tomar foto
6. ✅ Preview de foto aparece en pantalla
7. Click "Guardar cambios"
8. ✅ CRÍTICO: Cerrar app y reabrirla → Foto persiste
```

### Paso 5: Periféricos - GPS (2 minutos)
```
1. En detalle del mismo paciente
2. Sección "Ubicación GPS (Periférico 2)"
3. Click botón "🛰️ Capturar Ubicación"
4. ✅ Se solicita permiso (ACCESS_FINE_LOCATION)
5. Esperar 15 segundos (timeout)
6. ✅ Aparecen coordenadas: "Lat: -33.4489, Lon: -70.6693"
7. Click "Guardar cambios"
8. ✅ CRÍTICO: Cerrar app → GPS persiste
```

### Paso 6: Módulo Pacientes - UPDATE (1 minuto)
```
1. En detalle de "Carlos Martínez"
2. Modificar campo "Nombre" → "Carlos Eduardo Martínez"
3. Modificar "Turno" → "Noche"
4. Click "Guardar cambios"
5. ✅ Vuelve a listado
6. ✅ Paciente aparece actualizado
```

### Paso 7: Módulo Pacientes - DELETE (1 minuto)
```
1. En listado de Pacientes
2. Encontrar otro paciente (no Carlos, sino original)
3. Click ícono basura
4. ✅ Aparece AlertDialog: "¿Estás seguro de eliminar?"
5. Click "Eliminar"
6. ✅ Paciente desaparece del listado
7. ✅ Storage se actualiza
```

### Paso 8: Módulo Medicamentos (1 minuto)
```
1. Home → Click tarjeta "Medicamentos"
2. Listado de medicamentos (4 por defecto)
3. Click "+" para agregar medicamento
4. Crear: "Ibuprofeno" | 400mg | Analgésico | No delicado
5. ✅ Aparece en listado
6. Click en medicamento → Editar algún campo
7. ✅ Cambios persisten
```

**Total tiempo demo**: ~12 minutos ✅

---

## 🎓 PREGUNTAS TEÓRICAS - RESPUESTAS PREPARADAS

### **Bloque 1: Framework y Arquitectura**

#### **P1: ¿Cuál es la diferencia principal entre una SPA y una web tradicional?**

**Tu respuesta**:
> "Mi aplicación es una SPA (Single Page Application). Significa que se carga una sola vez (`index.html`) y luego Angular manage la navegación del lado del cliente sin recargar la página. 
>
> En cambio, una web tradicional recarga la página completa en cada navegación desde el servidor.
>
> **Ventajas en mi proyecto**: 
> - Transiciones más rápidas (no hay parpadeos)
> - Mejor UX con animaciones
> - Puedo usar Storage para mantener estado entre rutas"

---

#### **P2: Explica el ciclo de vida de componentes Angular (usa tu código como ejemplo)**

**Tu respuesta**:
> "Angular tiene varios hooks del ciclo de vida. Los que usé en mi proyecto son:
>
> **1. ngOnInit** (usado en todos):
> ```typescript
> // listado.page.ts
> ngOnInit() {
>   this.pacienteService.getPacientes$()
>     .pipe(takeUntil(this.destroy$))
>     .subscribe(pacientes => {
>       this.pacientes = pacientes;
>     });
> }
> ```
> Se ejecuta una vez después de que Angular inicializa el componente.
>
> **2. ngOnDestroy** (para limpiar):
> ```typescript
> ngOnDestroy() {
>   this.destroy$.next();
>   this.destroy$.complete();
> }
> ```
> Se ejecuta cuando el componente se destruye. Importante para desuscribirse y evitar memory leaks.
>
> **Otro hook que no usé pero sé**: ngOnChanges (cuando Input properties cambian), ngAfterViewInit (después que la vista se renderiza)"

---

#### **P3: ¿Qué función cumple Capacitor y cómo se diferencia de Cordova?**

**Tu respuesta**:
> "Capacitor es el bridge entre el código web (HTML/CSS/JS) y las APIs nativas del dispositivo (Android/iOS). Es el sucesor moderno de Cordova.
>
> **En mi proyecto uso Capacitor para**:
> 1. **Cámara** (`@capacitor/camera@7.0.2`)
>    - Acceder a la cámara del dispositivo
>    - Capturar foto y guardarla en Storage
>    
> 2. **Geolocalización** (`@capacitor/geolocation@7.1.6`)
>    - Acceder al GPS
>    - Obtener coordenadas de latitud/longitud
>
> **Diferencias vs Cordova**:
> - Capacitor: API moderna, mejor TypeScript support, plugins como npm packages
> - Cordova: Más antiguo, menos optimizado, pero más plugins disponibles"

---

#### **P4: ¿Qué es Data Binding? Usa ejemplos de tu proyecto**

**Tu respuesta**:
> "Data Binding es la conexión automática entre el modelo (TypeScript) y la vista (HTML).
>
> **Unidireccional (Component → View)**: La vista muestra el valor del componente
> ```html
> <!-- detalle.page.html -->
> <h2>{{ pacienteActual.nombre }}</h2>
> ```
> Si cambio `this.pacienteActual.nombre` en TypeScript, automáticamente se actualiza en HTML.
>
> **Bidireccional (Component ↔ View)**: FormControl
> ```html
> <!-- detalle.page.html -->
> <ion-input formControlName=\"nombre\"></ion-input>
> ```
> ```typescript
> // detalle.page.ts
> this.pacienteForm = this.fb.group({
>   nombre: [this.pacienteActual.nombre, Validators.required]
> });
> ```
> El usuario modifica en HTML → se actualiza en TypeScript → Validaciones se aplican automáticamente."

---

### **Bloque 2: Persistencia y Datos**

#### **P5: ¿Cuál es la diferencia entre LocalStorage y SQLite?**

**Tu respuesta**:
> "Ambos persisten datos, pero con diferencias importantes:
>
> **LocalStorage** (Web):
> - Almacena strings simples (max ~5-10MB)
> - No soporta queries complejas
> - Bloquea el thread principal (síncrono)
> - Ejemplo: `localStorage.setItem('isLoggedIn', 'true')`
>
> **SQLite** (Móvil - lo que uso):
> - Base de datos relacional real (capacidad ilimitada prácticamente)
> - Soporta queries SQL complejas
> - No-bloqueante (asíncrono con async/await)
> - Mejor para datos complejos
>
> **En mi proyecto**:
> - Uso `@ionic/storage-angular` que usa SQLite en Android/iOS
> - Almaceno arrays de pacientes/medicamentos en JSON
> - Implementé CRUD completo: Create, Read, Update, Delete"

---

#### **P6: Promesas vs Observables. ¿Cuál usaste?**

**Tu respuesta**:
> "Ambos manejan operaciones asincrónicas, pero con diferencias:
>
> **Promesas**:
> - Se resuelven una sola vez
> - No se cancelan
> - Ejemplo:
> ```typescript
> async tomarFoto() {
>   const photo = await Camera.getPhoto({...});
>   console.log(photo.webPath);
> }
> ```
>
> **Observables**:
> - Emiten múltiples valores en el tiempo
> - Se pueden cancelar (unsubscribe)
> - Operadores poderosos (map, filter, etc.)
> - Mejor para valores que cambian constantemente
> - Ejemplo:
> ```typescript
> this.pacienteService.getPacientes$()
>   .pipe(takeUntil(this.destroy$))
>   .subscribe(pacientes => {
>     this.pacientes = pacientes;
>   });
> ```
>
> **Usé ambas en mi proyecto**:
> - **Promesas**: Para periféricos (Cámara, GPS) - operación única
> - **Observables**: Para servicios de datos - emiten cambios en tiempo real"

---

#### **P7: POST vs PUT vs PATCH en HTTP**

**Tu respuesta**:
> "Son verbos HTTP para operaciones CRUD:
>
> **POST**: Crear nuevo recurso
> - `POST /api/pacientes` con body: `{nombre: 'Juan', rut: '...', piso: 1}`
> - Servidor genera ID automático
>
> **PUT**: Reemplazar recurso completo
> - `PUT /api/pacientes/1` con body: `{nombre: 'Juan', rut: '...', piso: 2}`
> - Reemplaza TODO el recurso
>
> **PATCH**: Actualizar parcial
> - `PATCH /api/pacientes/1` con body: `{piso: 2}`
> - Solo actualiza lo que envías
>
> **En mi proyecto** (actualmente con Storage, no HTTP):
> ```typescript
> // Lo equivalente a POST:
> await pacienteService.crearPaciente({nombre, rut, piso, turno});
>
> // Lo equivalente a PUT/PATCH:
> await pacienteService.actualizarPaciente(id, {nombre, piso});
> ```"

---

#### **P8: Códigos de estado HTTP (200, 401, 403, 404, 500)**

**Tu respuesta**:
> "Son códigos que devuelve el servidor para indicar el resultado:
>
> - **200 OK**: Solicitud exitosa ✅
> - **401 Unauthorized**: Sin autenticación (no hizo login)
> - **403 Forbidden**: Autenticado pero sin permisos
> - **404 Not Found**: Recurso no existe
> - **500 Server Error**: Error del servidor
>
> **En mi proyecto**:
> Actualmente uso Storage (no tengo backend), pero si conectara a API:
> ```typescript
> this.http.get('/api/pacientes').subscribe(
>   data => console.log(data),  // 200 OK
>   error => {
>     if (error.status === 401) logout();
>     if (error.status === 404) showNotFound();
>     if (error.status === 500) showError();
>   }
> );
> ```"

---

### **Bloque 3: Depuración y Periféricos**

#### **P10: ¿Para qué sirven los breakpoints?**

**Tu respuesta**:
> "Los breakpoints pausan la ejecución en una línea específica para depurar.
>
> **En Android Studio o Chrome DevTools**:
> 1. Click en el número de línea → aparece punto rojo
> 2. Ejecutar la app
> 3. Cuando llega a ese punto → pausa ejecución
> 4. Puedo inspeccionar variables, ver call stack, step over/into código
>
> **Ejemplo de mi proyecto**:
> ```typescript
> async tomarFoto() {
>   // Pongo breakpoint aquí
>   const photo = await Camera.getPhoto({...});
>   // Breakpoint aquí para verificar que photo.webPath tiene valor
>   this.fotoUrl = photo.webPath;
> }
> ```
> Así verifico que los datos se capturan correctamente."

---

#### **P11: ¿Por qué es necesario gestionar permisos en Android/iOS?**

**Tu respuesta**:
> "Por seguridad y privacidad del usuario. No queremos que apps accedan a cámara/GPS sin permiso.
>
> **En Android hay dos niveles**:
>
> **1. Manifest Permissions** (nivel instalación):
> ```xml
> <!-- AndroidManifest.xml -->
> <uses-permission android:name=\"android.permission.CAMERA\" />
> <uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\" />
> ```
>
> **2. Runtime Permissions** (nivel ejecución, Android 6+):
> ```typescript
> const status = await Geolocation.checkPermissions();
> if (status.location !== 'granted') {
>   await Geolocation.requestPermissions();
> }
> ```
>
> **En mi proyecto**:
> - Agregué permisos en AndroidManifest.xml
> - Implementé checkPermissions y requestPermissions en Geolocation
> - Para Cámara, Capacitor lo hace automáticamente
>
> **Sin esto**: La app crashea al intentar usar cámara/GPS"

---

#### **P12: ¿Qué es Dependency Injection? Evidencia en tu código**

**Tu respuesta**:
> "Dependency Injection (DI) es un pattern donde inyectas dependencias en lugar de crearlas internamente.
>
> **Sin DI (malo)**:
> ```typescript
> export class DetallePage {
>   private pacienteService = new PacienteService(); // ❌ Acoplamiento
> }
> ```
>
> **Con DI (bueno)**:
> ```typescript
> export class DetallePage {
>   constructor(
>     private pacienteService: PacienteService, // ✅ Inyectado
>     private router: Router                    // ✅ Inyectado
>   ) {}
> }
> ```
>
> **Ventajas**:
> - Testing: Puedo inyectar un mock del servicio
> - Singleton: Angular crea una sola instancia del servicio para toda la app
> - Desacoplamiento: El componente no sabe cómo crear el servicio
>
> **En mi proyecto**:
> ```typescript
> // Todos mis componentes usan DI
> constructor(
>   private pacienteService: PacienteService,
>   private medicamentoService: MedicamentoService,
>   private alertController: AlertController,
>   private router: Router
> ) {}
> ```
> Así los servicios están centralizados y sincronizados."

---

## 🎯 ESTRATEGIA DE RESPUESTA

### Si te hacen una pregunta que NO esperabas:

1. **No digas "No sé"** → Di "Déjame pensar un segundo"
2. **Relaciona con tu proyecto** → Usa ejemplos de tu código
3. **Si no sabes**: Admite con honestidad
   > "No lo implementé en mi proyecto, pero desde lo que sé..."

### Practica antes de la defensa:

```bash
# 1. Ejecutar la demo 5 veces seguidas
# 2. Cronometrar: debe durar 10-15 minutos
# 3. Practicar respuestas de preguntas frente a un espejo
# 4. Tener el repositorio abierto en GitHub durante la defensa
```

---

## 📊 RUBRICA FINAL ESPERADA

| Criterio | Peso | Tu Puntaje | Máximo |
|----------|------|-----------|---------|
| CRUD Completo | 40% | 3.5 | 4.0 |
| Periféricos Funcionales | 20% | 2.0 | 2.0 |
| Calidad Código y UI | 10% | 0.9 | 1.0 |
| Defensa y Respuestas Teóricas | 30% | 2.5 | 3.0 |
| **TOTAL** | 100% | **8.9/10** | **10.0** |

**Nota estimada: 6.0 - 6.5 / 7.0** ✅

---

## ✅ CHECKLIST ANTES DE DEFENSA

- [ ] Compilación: `npx ng build --configuration development` (sin errores)
- [ ] Android Studio: Emulador creado y funcionando
- [ ] App: Instalada y ejecutándose en emulador
- [ ] Permisos: CAMERA y LOCATION pedidos en runtime
- [ ] Demo: Practicada 5 veces (cronometrar)
- [ ] Respuestas: Memorizadas (no leer de papel)
- [ ] Código: Repositorio actualizado en GitHub
- [ ] Documentación: RESUMEN-PERSISTENCIA.md disponible
- [ ] Periféricos: Foto y GPS funcionando en emulador
- [ ] CRUD: Create/Read/Update/Delete todos funcionales
- [ ] Persistencia: Datos sobreviven al reinicio de app

---

## 🎓 ÚLTIMO CONSEJO

> "La defensa no es para reprobar. El docente quiere ver que:
> 1. Tu app funciona (demo)
> 2. Entiendes lo que hiciste (respuestas teóricas)
> 3. Eres honesto si no sabes algo
>
> Tú cumples los 3 requisitos. Solo prepárate bien y practica la demo. ¡Éxito!"

---

**Repositorio**: https://github.com/murloc41/EV3_APLICACIONMOVIL  
**Rama**: main  
**Commits**: `feat: Implementar persistencia CRUD completo`  
**Última actualización**: 20 de diciembre de 2025

¡Buena suerte en la defensa! 🎓🚀
