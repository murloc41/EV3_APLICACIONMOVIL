import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, 
    IonBackButton, AlertController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircleOutline, trashOutline, createOutline, addCircleOutline } from 'ionicons/icons';
import { PacienteService, Paciente } from 'src/app/services/paciente.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.page.html',
    styleUrls: ['./listado.page.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, 
        IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton, 
        IonSearchbar, 
        RouterLink,
        IonBackButton
    ]
})
export class ListadoPage implements OnInit, OnDestroy {

    public pacientes: Paciente[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private pacienteService: PacienteService,
        private alertController: AlertController
    ) { 
        addIcons({ personCircleOutline, trashOutline, createOutline, addCircleOutline });
    }

    ngOnInit() {
        // Suscribirse a cambios en pacientes
        this.pacienteService.getPacientes$()
            .pipe(takeUntil(this.destroy$))
            .subscribe(pacientes => {
                this.pacientes = pacientes;
                console.log('📋 Listado actualizado:', pacientes);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    verDetalle(pacienteId: number) {
        console.log(`Navegando a detalle del paciente ID: ${pacienteId}`);
    }

    async confirmarEliminacion(pacienteId: number, event: Event) {
        event.stopPropagation();
        
        const paciente = this.pacienteService.obtenerPacienteById(pacienteId);
        if (!paciente) return;

        const alert = await this.alertController.create({
            header: 'Confirmar Eliminación',
            message: `¿Estás seguro de que deseas **eliminar** al paciente ${paciente.nombre}? Esta acción es irreversible.`,
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                { 
                    text: 'Eliminar', 
                    role: 'destructive', 
                    handler: async () => {
                        await this.pacienteService.eliminarPaciente(pacienteId);
                    }
                },
            ],
        });

        await alert.present();
    }
}