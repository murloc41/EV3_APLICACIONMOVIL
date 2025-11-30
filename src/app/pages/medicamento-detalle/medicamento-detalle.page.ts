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

// Reutilizamos la interfaz del medicamento
interface Medicamento {
    id: number;
    nombre: string;
    dosisMg: number;
    tipo: string;
    usoDelicado: boolean;
}

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
        private alertController: AlertController
    ) { 
        addIcons({ saveOutline, trashOutline, medkitOutline });
    }

    ngOnInit() {
        const medicamentoIdParam = this.route.snapshot.paramMap.get('id');
        const idSimulado = medicamentoIdParam ? parseInt(medicamentoIdParam) : 101; 

        // 1. Cargar datos del medicamento (simulado)
        this.medicamentoActual = this.simularCargaMedicamento(idSimulado);

        // 2. Inicializar el formulario con los datos cargados
        this.medicamentoForm = this.fb.group({
            nombre: [this.medicamentoActual.nombre, [Validators.required, Validators.minLength(3)]],
            dosisMg: [this.medicamentoActual.dosisMg, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
            tipo: [this.medicamentoActual.tipo, Validators.required],
            usoDelicado: [this.medicamentoActual.usoDelicado, Validators.required]
        });
    }

    simularCargaMedicamento(id: number): Medicamento {
        // Datos de simulación para cargar el formulario
        const datosSimulados: Medicamento[] = [
            { id: 101, nombre: 'Amlodipino', dosisMg: 50, tipo: 'Antiinflamatorio', usoDelicado: false },
            { id: 102, nombre: 'Morfina', dosisMg: 10, tipo: 'Analgésico', usoDelicado: true },
            { id: 103, nombre: 'Amoxicilina', dosisMg: 500, tipo: 'Antibiótico', usoDelicado: false },
            { id: 104, nombre: 'Tramadol', dosisMg: 50, tipo: 'Analgésico', usoDelicado: true },
        ];
        // Devuelve el medicamento encontrado o el primero por defecto
        return datosSimulados.find(m => m.id === id) || datosSimulados[0];
    }

    guardarCambios() {
        if (this.medicamentoForm.valid) {
            console.log('✅ Medicamento actualizado. ID:', this.medicamentoActual.id, 'Datos:', this.medicamentoForm.value);
            // Navegar de vuelta al listado de medicamentos
            this.router.navigate(['/medicamento-listado']);
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

    eliminarMedicamento() {
        console.log(`🔥 Medicamento ${this.medicamentoActual.id} eliminado del inventario.`);
        this.router.navigate(['/medicamento-listado']);
    }
}