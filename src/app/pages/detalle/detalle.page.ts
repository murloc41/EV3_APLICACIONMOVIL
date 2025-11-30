import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule 
} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router'; 
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonButtons, IonSelect, IonSelectOption,
    IonBackButton ,IonList,IonText,IonNote
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular'; 
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline, trashOutline, cameraOutline, locateOutline } from 'ionicons/icons';

//  Importar Capacidades Nativas y Servicio de Persistencia
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { PreferencesService } from 'src/app/services/preferences.service';


// Reutilizamos la interfaz del paciente
interface Paciente {
    id: number;
    nombre: string;
    rut: string;
    piso: number;
    turno: 'Mañana' | 'Tarde' | 'Noche';
}

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.page.html',
    styleUrls: ['./detalle.page.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
        IonInput, IonButton, IonIcon, IonButtons, IonSelect, IonSelectOption,
        IonBackButton,IonList,IonText,IonNote
    ]
})
export class DetallePage implements OnInit {

    pacienteForm!: FormGroup;
    pacienteActual!: Paciente; 
    turnos = ['Mañana', 'Tarde', 'Noche'];
    private readonly ID_PATTERN = /^[0-9]{7,9}-[0-9kK]$/; 
    
    //  Propiedades para Cámara y Geolocalización
    fotoUrl: string | undefined; 
    ubicacionActual: string | null = null;
    coords: { lat: number, lon: number } | null = null;
  
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertController: AlertController,
        //  Inyectar el Servicio de Persistencia
        private preferencesService: PreferencesService 
    ) { 
        //  Añadir íconos de los periféricos
        addIcons({ arrowBackOutline, saveOutline, trashOutline, cameraOutline, locateOutline });
    }

    async ngOnInit() { 
        const pacienteIdParam = this.route.snapshot.paramMap.get('id');
        const idSimulado = pacienteIdParam ? parseInt(pacienteIdParam) : 2; 

        this.pacienteActual = this.simularCargaPaciente(idSimulado);

        this.pacienteForm = this.fb.group({
            nombre: [this.pacienteActual.nombre, [Validators.required, Validators.minLength(3)]],
            idPaciente: [this.pacienteActual.rut, [Validators.required, Validators.pattern(this.ID_PATTERN)]],
            piso: [this.pacienteActual.piso, [Validators.required, Validators.min(1)]],
            turno: [this.pacienteActual.turno, Validators.required]
        });
        
        //  Persistencia: Recargar datos nativos al iniciar
        
        // 1. Recargar Foto
        const storedUri = await this.preferencesService.getValue<string>(`foto_${this.pacienteActual.id}`);
        if (storedUri && typeof storedUri === 'string') {
            this.fotoUrl = storedUri;
        }

        // 2. Recargar Ubicación
        const storedCoords = await this.preferencesService.getValue<{ lat: number, lon: number }>(`coords_${this.pacienteActual.id}`);
        if (storedCoords && typeof storedCoords.lat === 'number' && typeof storedCoords.lon === 'number') {
            this.coords = storedCoords;
            this.ubicacionActual = `Ubicación RECUPERADA (Lat: ${storedCoords.lat.toFixed(4)}, Lon: ${storedCoords.lon.toFixed(4)})`;
        }
        
    }

    simularCargaPaciente(id: number): Paciente {
        const datosSimulados: Paciente[] = [
            { id: 1, nombre: 'Ana María Soto', rut: '19.456.789-K', piso: 3, turno: 'Mañana' },
            { id: 2, nombre: 'Roberto González', rut: '15.123.456-7', piso: 5, turno: 'Tarde' },
            { id: 3, nombre: 'Javier Fuentes', rut: '18.987.654-2', piso: 1, turno: 'Noche' },
            { id: 4, nombre: 'Laura Pérez', rut: '20.555.111-9', piso: 3, turno: 'Mañana' },
        ];
        return datosSimulados.find(p => p.id === id) || datosSimulados[0];
    }

    guardarCambios() {
        if (this.pacienteForm.valid) {
            console.log(' Paciente actualizado. ID:', this.pacienteActual.id, 'Datos:', this.pacienteForm.value);
            this.router.navigate(['/listado']);
        } else {
            console.log(' Formulario inválido para actualización.');
            this.pacienteForm.markAllAsTouched();
        }
    }

    //  Métodos de Periféricos

    /**
     * Periférico 1: Cámara. Captura una foto y persiste su URI.
     */
    async tomarFoto() {
        try {
            // GESTIÓN DE PERMISOS: La API de la Cámara solicita el permiso automáticamente
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                // En web usa Prompt, en nativo usa Camera directamente
                source: Capacitor.isNativePlatform() ? CameraSource.Camera : CameraSource.Prompt,
            });

            if (image.webPath) {
                const nuevaFotoUri = image.webPath; 
                this.fotoUrl = nuevaFotoUri;
                
                // PERSISTENCIA LOCAL: Guardar la URI
                const clave = `foto_${this.pacienteActual.id}`;
                await this.preferencesService.setValue<string>(clave, nuevaFotoUri);
                console.log(` Foto guardada para paciente ${this.pacienteActual.id}`);
            }
        } catch (error) {
            console.error('Error al tomar la foto (Permiso denegado o cancelación):', error);
            this.alertController.create({
                header: 'Cámara Inaccesible',
                message: 'No se pudo acceder a la cámara. Verifique los permisos o si canceló la operación.',
                buttons: ['OK']
            }).then(alert => alert.present());
        }
    }

    /**
     * Periférico 2: Geolocalización. Captura coordenadas y persiste.
     */
    async obtenerUbicacion() {
        console.log(' Iniciando captura de ubicación...');
        
        // 1. GESTIÓN DE PERMISOS: Revisar y solicitar permisos
        let permStatus: PermissionStatus;
        
        try {
            permStatus = await Geolocation.checkPermissions();
            console.log(' Estado de permisos:', permStatus.location);
        } catch (error) {
            console.error(' Error al verificar permisos:', error);
            this.alertController.create({
                header: 'Error',
                message: 'No se pudo verificar el estado de los permisos de ubicación.',
                buttons: ['OK']
            }).then(alert => alert.present());
            return;
        }

        if (permStatus.location !== 'granted') {
            console.log(' Solicitando permisos de ubicación...');
            try {
                permStatus = await Geolocation.requestPermissions();
                console.log(' Respuesta de permisos:', permStatus.location);
            } catch (error) {
                console.error(' Error al solicitar permisos:', error);
            }
            
            if (permStatus.location !== 'granted') {
                this.alertController.create({
                    header: 'Permiso Denegado',
                    message: 'El permiso de ubicación fue denegado. No se puede capturar la ubicación.',
                    buttons: ['OK']
                }).then(alert => alert.present());
                return;
            }
        }

        // 2. Capturar ubicación (timeout aumentado a 15 segundos)
        this.ubicacionActual = 'Buscando ubicación GPS...';
        console.log('🛰️ Capturando posición GPS...');
        
        try {
            const position = await Geolocation.getCurrentPosition({ 
                enableHighAccuracy: true, 
                timeout: 15000,  // 15 segundos
                maximumAge: 0    // No usar cache
            });
            
            console.log(' Posición obtenida:', position.coords);
            
            this.coords = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            this.ubicacionActual = `Ubicación capturada: Latitud ${this.coords.lat.toFixed(4)}, Longitud ${this.coords.lon.toFixed(4)}`;
            
            // 3. PERSISTENCIA LOCAL: Guardar las coordenadas
            const claveCoords = `coords_${this.pacienteActual.id}`;
            await this.preferencesService.setValue<{ lat: number, lon: number }>(claveCoords, this.coords);
            console.log(` Ubicación guardada para paciente ${this.pacienteActual.id}`);
            
        } catch (e: any) {
            console.error(' Error al obtener la ubicación:', e);
            this.ubicacionActual = null;
            
            let mensaje = 'Error al obtener la ubicación. ';
            
            if (e.message?.includes('timeout')) {
                mensaje += 'Tiempo de espera agotado. Asegúrese de tener el GPS activo y estar en un lugar con buena señal.';
            } else if (e.message?.includes('denied')) {
                mensaje += 'Permiso denegado. Active los permisos de ubicación en la configuración del dispositivo.';
            } else {
                mensaje += 'Verifique que el GPS esté activo y que tenga señal.';
            }
            
            this.alertController.create({
                header: 'Error de GPS',
                message: mensaje,
                buttons: ['OK']
            }).then(alert => alert.present());
        }
    }
    
    async mostrarConfirmacionEliminar() {
        const alert = await this.alertController.create({
            header: 'Confirmar Eliminación',
            message: `¿Estás seguro de que deseas **eliminar** al paciente ${this.pacienteActual.nombre}? Esta acción es irreversible.`,
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                { text: 'Eliminar', role: 'destructive', handler: () => { this.eliminarPaciente(); } },
            ],
        });
        await alert.present();
    }

    async eliminarPaciente() {
        // Limpiar datos persistidos del paciente
        await this.preferencesService.removeValue(`foto_${this.pacienteActual.id}`);
        await this.preferencesService.removeValue(`coords_${this.pacienteActual.id}`);
        console.log(` Paciente ${this.pacienteActual.id} eliminado del sistema (datos persistidos limpiados).`);
        this.router.navigate(['/listado']);
    }
}