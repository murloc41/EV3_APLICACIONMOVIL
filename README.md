# Esculappmed

## 1. Descripción del Contexto
Aplicación móvil híbrida orientada al personal de salud (técnicos, enfermería, médicos) para agilizar tareas de:
- Registro y consulta de pacientes
- Gestión básica de medicamentos y detalles
- Entregas de turno con apoyo visual y contextual
- Documentación rápida mediante captura fotográfica y ubicación geográfica

Esta segunda fase (Unidad 2) se centra en la integración de periféricos nativos para aportar valor operacional al flujo clínico cotidiano.

## 2. Objetivos de la Fase (Unidad 2)
- Integrar dos periféricos nativos (Cámara y Geolocalización)
- Gestionar permisos en tiempo de ejecución (runtime) y a nivel de manifiesto Android
- Persistir datos obtenidos de periféricos en almacenamiento nativo (Capacitor Preferences)
- Recuperar automáticamente dichos datos tras reiniciar la aplicación

## 3. Tecnologías Utilizadas
- Framework UI: Ionic 8 + Angular 20
- Runtime nativo: Capacitor 7
- Lenguaje: TypeScript
- Plugins Capacitor:
  - `@capacitor/camera` (captura de foto)
  - `@capacitor/geolocation` (coordenadas GPS)
  - `@capacitor/preferences` (persistencia de claves simples)
- Herramientas desarrollo: Android Studio, Emulador Pixel / Dispositivo físico

## 4. Periféricos Implementados
### 4.1 Cámara
- **Plugin**: `@capacitor/camera`
- **Flujo**: Botón "Tomar Foto / Actualizar Foto" → Solicitud de permiso (si aplica) → Apertura cámara nativa → Captura → Previsualización en interfaz.
- **Persistencia**: Se guarda la URI (`webPath`) en Preferences bajo la clave `foto_{idPaciente}`.
- **Recuperación**: Al iniciar la página de detalle (`ngOnInit`) se lee la clave y se restituye la imagen.

### 4.2 Geolocalización (GPS)
- **Plugin**: `@capacitor/geolocation`
- **Flujo**: Botón "Capturar Ubicación Actual" → Verificación de permisos `checkPermissions()` → Solicitud `requestPermissions()` si no otorgado → Obtención de `lat` / `lon` con alta precisión → Visualización del resultado al usuario.
- **Persistencia**: Se almacena objeto `{ lat, lon }` con clave `coords_{idPaciente}`.
- **Recuperación**: Al iniciar se lee la clave y se muestra mensaje "Ubicación RECUPERADA" con valores formateados.

## 5. Gestión de Permisos
### AndroidManifest.xml
Permisos declarados:
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" android:required="false" />
```
### Runtime
- Cámara: El plugin solicita permiso automáticamente al primer uso.
- GPS: Secuencia explícita (`checkPermissions` → `requestPermissions` → validación) con manejo de denegación vía `AlertController`.

## 6. Persistencia de Datos
- Servicio: `PreferencesService` con métodos genéricos `setValue<T>()` y `getValue<T>()`.
- Claves empleadas:
  - Foto: `foto_{id}`
  - Coordenadas: `coords_{id}`
- Al eliminar paciente se limpian las claves asociadas.

## 7. Configuración del Proyecto
- **App ID**: `com.Esculappmed`
- **App Name**: `Esculappmed`
- **WebDir**: `www` (carpeta de build)

## 8. Archivos Clave
- Página de detalle paciente (integración periféricos): `src/app/pages/detalle/detalle.page.ts` / `.html`
- Servicio de persistencia: `src/app/services/preferences.service.ts`
- Manifiesto Android: `android/app/src/main/AndroidManifest.xml`
- Configuración Capacitor: `capacitor.config.ts`

## 9. Credenciales de Acceso
Para acceder a la aplicación usar:
- **Usuario**: `admin@mail.com`
- **Contraseña**: `123456`

## 10. Flujo de Uso (Resumen)
1. Login con credenciales (admin@mail.com / 123456)
2. Acceder a listado de pacientes desde el menú principal
3. Abrir detalle de paciente (ej: Roberto González)
4. **Cámara**: Presionar "Tomar Foto / Actualizar Foto" → Aceptar permiso → Capturar → Se guarda y muestra
5. **GPS**: Presionar "Capturar Ubicación Actual" → Aceptar permiso → Esperar señal → Se muestra lat/lon y se guarda
6. Reiniciar aplicación → Navegar al mismo paciente → Foto y ubicación se rehidratan automáticamente

## 11. Comandos Principales
### Desarrollo web
```powershell
npx ionic serve
```
### Build + Sincronización nativa
```powershell
npx ionic build
npx cap sync
```
### Abrir proyecto Android
```powershell
npx cap open android
```
### Reejecutar tras cambios
```powershell
npx ionic build
npx cap sync
```

## 12. Procedimiento para Capturas de Pantalla (Evidencia)
Colocar cada captura en el informe PDF siguiendo este orden:
1. Permiso de cámara solicitado (diálogo del sistema).
2. Permiso de ubicación solicitado.
3. Cámara abierta (pantalla de captura) y luego foto mostrada en la UI.
4. Ubicación capturada (vista con "Ubicación capturada: Latitud ..., Longitud ...").
5. Log de consola o Logcat mostrando claves guardadas (`✅ Foto guardada`, `✅ Ubicación guardada`).
6. Reinicio de la app mostrando foto y "Ubicación RECUPERADA".

### Marcadores (coloca tus imágenes debajo):
- [CAPTURA 1] Permiso Cámara
- [CAPTURA 2] Permiso Ubicación
- [CAPTURA 3] Cámara Abierta
- [CAPTURA 4] Foto Guardada en Interfaz
- [CAPTURA 5] Ubicación Capturada
- [CAPTURA 6] Evidencia Persistencia (Logcat / Texto)
- [CAPTURA 7] Datos Tras Reinicio

## 13. Estructura de Navegación y Seguridad
### Rutas Públicas (sin AuthGuard)
- `/login` - Pantalla de inicio de sesión
- `/registro` - Registro de nuevos usuarios

### Rutas Protegidas (con AuthGuard)
- `/tabs` - Contenedor principal con tabs (Pacientes, Medicamentos)
- `/home` - Página principal post-login
- `/listado` - Listado de pacientes
- `/detalle/:id` - Detalle de paciente (integración de periféricos)
- `/agregar` - Agregar nuevo paciente
- `/medicamento-listado` - Listado de medicamentos
- `/medicamento-detalle/:id` - Detalle de medicamento
- `/medicamento-agregar` - Agregar nuevo medicamento

### Servicio de Autenticación
- `AuthService`: Gestiona estado de login con `BehaviorSubject`
- `AuthGuard`: Protege rutas privadas, redirige a `/login` si no autenticado
- Persistencia: `localStorage` con clave `isLoggedIn`

## 14. Validaciones y Formularios (Resumen EV1)
- Uso de `ReactiveFormsModule` y `Validators` en login, registro, agregar paciente y detalle.
- Validaciones incluidas: `required`, `minLength`, `email`, `pattern`.
- Bloqueo de envío si formulario inválido; uso de `markAllAsTouched()` para feedback.

## 15. Manejo de Errores y Experiencia
- Cámara: Alert en caso de cancelación o denegación.
- GPS: Mensajes diferenciados para timeout, denegación o fallo general.
- Logs con emojis (`✅`, `❌`, `📍`) para facilitar rastreo en Logcat.

## 16. Consideraciones Técnicas Adicionales
- Preferences no cifra datos; adecuado para información no sensible (URI y coordenadas). Para credenciales usar almacenamiento seguro (Keychain/Keystore).
- Timeout GPS aumentado a 15 segundos para ambientes con señal débil.
- Uso de `Capacitor.isNativePlatform()` para fuente de cámara distinta en web vs nativo.

## 17. Posibles Mejoras Futuras (No Obligatorias)
- Persistencia de histórico de ubicaciones y fotos por paciente.
- Integración de backend para sincronización entre dispositivos.
- Encriptación de datos sensibles.
- Notificaciones locales para recordatorios de administración de medicamentos.
- Exportación de reporte PDF con foto + ubicación.

## 18. Conclusión
La fase 2 del proyecto cumple con el Resultado de Aprendizaje 1.3: se integran dos periféricos nativos funcionales (Cámara y Geolocalización), se gestionan sus permisos apropiadamente y se persiste la información relevante, reconstituyéndola al reinicio de la aplicación. El flujo aporta valor claro al contexto clínico y sienta bases para evolución futura.

---
**Autor:** [Tu Nombre]
**Asignatura:** [Nombre Asignatura]
**Profesor:** [Nombre Profesor]
**Fecha:** [DD/MM/AAAA]
