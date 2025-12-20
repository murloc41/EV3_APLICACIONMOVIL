import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; // Necesario para cargar el ID y navegar
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonInput, IonButton, IonSelect, IonSelectOption, IonToggle, 
    IonIcon, IonButtons, IonBackButton, IonNote 
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { saveOutline, trashOutline, medkitOutline } from 'ionicons/icons';
import { MedicamentoService, Medicamento } from 'src/app/services/medicamento.service';

@Component({
    selector: 'app-medicamento-detalle',
    templateUrl: './medicamento-detalle.page.html',
    styleUrls: ['./medicamento-detalle.page.scss'],
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
        IonInput, IonButton, IonSelect, IonSelectOption, IonToggle,
        IonIcon, IonButtons, IonBackButton, IonNote 
    ]
})
export class MedicamentoDetallePage implements OnInit {

    medicamentoForm!: FormGroup;
    medicamentoActual!: Medicamento; 
    tiposMedicamento = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Vitamina', 'Otro'];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertController: AlertController,
        private medicamentoService: MedicamentoService
    ) { 
        addIcons({ saveOutline, trashOutline, medkitOutline });
    }

    ngOnInit() {
        const medicamentoIdParam = this.route.snapshot.paramMap.get('id');
        const medicamentoId = medicamentoIdParam ? parseInt(medicamentoIdParam) : 101; 

        // Cargar medicamento del servicio
        this.medicamentoActual = this.medicamentoService.obtenerMedicamentoById(medicamentoId) || {
            id: 0,
            nombre: 'Medicamento no encontrado',
            dosisMg: 0,
            tipo: '',
            usoDelicado: false
        };

        // Inicializar el formulario con los datos cargados
        this.medicamentoForm = this.fb.group({
            nombre: [this.medicamentoActual.nombre, [Validators.required, Validators.minLength(3)]],
            dosisMg: [this.medicamentoActual.dosisMg, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
            tipo: [this.medicamentoActual.tipo, Validators.required],
            usoDelicado: [this.medicamentoActual.usoDelicado, Validators.required]
        });
    }

    async guardarCambios() {
        if (this.medicamentoForm.valid) {
            try {
                const datosActualizados = {
                    nombre: this.medicamentoForm.get('nombre')?.value,
                    dosisMg: this.medicamentoForm.get('dosisMg')?.value,
                    tipo: this.medicamentoForm.get('tipo')?.value,
                    usoDelicado: this.medicamentoForm.get('usoDelicado')?.value
                };

                await this.medicamentoService.actualizarMedicamento(this.medicamentoActual.id, datosActualizados);
                console.log('✅ Medicamento actualizado. ID:', this.medicamentoActual.id);
                this.router.navigate(['/medicamento-listado']);
            } catch (error) {
                console.error('❌ Error al actualizar medicamento:', error);
            }
        } else {
            console.log('❌ Formulario de actualización inválido.');
            this.medicamentoForm.markAllAsTouched();
        }
    }

    // Lógica de confirmación de eliminación
    async mostrarConfirmacionEliminar() {
        const alert = await this.alertController.create({
            header: 'Confirmar Eliminación',
            message: `¿Estás seguro de que deseas **eliminar** el medicamento ${this.medicamentoActual.nombre}?`,
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                { text: 'Eliminar', role: 'destructive', handler: () => { this.eliminarMedicamento(); } },
            ],
        });
        await alert.present();
    }

    async eliminarMedicamento() {
        try {
            await this.medicamentoService.eliminarMedicamento(this.medicamentoActual.id);
            console.log(`✅ Medicamento ${this.medicamentoActual.id} eliminado del inventario.`);
            this.router.navigate(['/medicamento-listado']);
        } catch (error) {
            console.error('❌ Error al eliminar medicamento:', error);
        }
    }
}