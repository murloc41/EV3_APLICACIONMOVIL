import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, IonNote,
    IonBackButton, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { medkitOutline, trashOutline, createOutline, addCircleOutline, alertCircleOutline } from 'ionicons/icons';
import { MedicamentoService, Medicamento } from 'src/app/services/medicamento.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-medicamento-listado',
    templateUrl: './medicamento-listado.page.html',
    styleUrls: ['./medicamento-listado.page.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, 
        IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton, 
        IonSearchbar, IonNote, 
        RouterLink,
        IonBackButton
    ]
})
export class MedicamentoListadoPage implements OnInit, OnDestroy {

    public medicamentos: Medicamento[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private medicamentoService: MedicamentoService,
        private router: Router,
        private alertController: AlertController
    ) { 
        addIcons({ medkitOutline, trashOutline, createOutline, addCircleOutline, alertCircleOutline });
    }

    ngOnInit() {
        // Suscribirse a cambios en medicamentos
        this.medicamentoService.getMedicamentos$()
            .pipe(takeUntil(this.destroy$))
            .subscribe(medicamentos => {
                this.medicamentos = medicamentos;
                console.log('💊 Listado de medicamentos actualizado:', medicamentos);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    verDetalleMedicamento(medicamentoId: number) {
        console.log(`Navegando a detalle del medicamento ID: ${medicamentoId}`);
    }

    async confirmarEliminacion(medicamentoId: number, event: Event) {
        event.stopPropagation();
        
        const medicamento = this.medicamentoService.obtenerMedicamentoById(medicamentoId);
        if (!medicamento) return;

        const alert = await this.alertController.create({
            header: 'Confirmar Eliminación',
            message: `¿Estás seguro de que deseas **eliminar** ${medicamento.nombre}? Esta acción es irreversible.`,
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                { 
                    text: 'Eliminar', 
                    role: 'destructive', 
                    handler: async () => {
                        await this.medicamentoService.eliminarMedicamento(medicamentoId);
                    }
                },
            ],
        });

        await alert.present();
    }
}