import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms'; 

import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, 
    IonButton, IonSelect, IonSelectOption, IonToggle, IonText, 
    IonNote,
    IonButtons, IonIcon, IonBackButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { saveOutline, medkitOutline } from 'ionicons/icons';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
    selector: 'app-medicamento-agregar',
    templateUrl: './medicamento-agregar.page.html',
    styleUrls: ['./medicamento-agregar.page.scss'],
    standalone: true,
    imports: [
        IonContent, IonHeader, IonTitle, IonToolbar, 
        CommonModule, ReactiveFormsModule, 
        IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, 
        IonToggle, IonText, IonNote,
        IonButtons, IonIcon, IonBackButton
    ]
})
export class MedicamentoAgregarPage implements OnInit {

    medicamentoForm!: FormGroup;
    tiposMedicamento = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Vitamina', 'Otro'];

    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private medicamentoService: MedicamentoService
    ) {
        addIcons({ saveOutline, medkitOutline });
    } 

    ngOnInit() {
        this.medicamentoForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            
            dosisMg: ['', [
                Validators.required,
                Validators.min(1),
                Validators.pattern(/^[0-9]*$/)
            ]],
            
            tipo: ['', Validators.required],
            usoDelicado: [false, Validators.required] 
        });
    }

    async submitMedicamento() {
        if (this.medicamentoForm.valid) {
            try {
                const nuevoMedicamento = {
                    nombre: this.medicamentoForm.get('nombre')?.value,
                    dosisMg: this.medicamentoForm.get('dosisMg')?.value,
                    tipo: this.medicamentoForm.get('tipo')?.value,
                    usoDelicado: this.medicamentoForm.get('usoDelicado')?.value
                };

                await this.medicamentoService.crearMedicamento(nuevoMedicamento);
                console.log('✅ Medicamento registrado. Navegando al listado...');
                this.router.navigate(['/medicamento-listado']);
            } catch (error) {
                console.error('❌ Error al crear medicamento:', error);
            }
        } else {
            console.log('❌ Formulario Inválido. Revisar validaciones.');
            this.medicamentoForm.markAllAsTouched();
        }
    }
}