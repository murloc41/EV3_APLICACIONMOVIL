import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Necesario para la navegación post-registro
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms'; 

import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, 
    IonButton, IonSelect, IonSelectOption, IonToggle, IonText, 
    IonNote,
    IonButtons, IonIcon, IonBackButton // <-- ¡CORRECCIÓN: Añadido IonIcon, IonButtons y IonBackButton!
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { saveOutline, medkitOutline } from 'ionicons/icons'; // Aseguramos que medkitOutline está para el header

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
        IonButtons, IonIcon, IonBackButton // <-- ¡CORRECCIÓN: Incluidos en el array!
    ]
})
export class MedicamentoAgregarPage implements OnInit {

    medicamentoForm!: FormGroup;
    tiposMedicamento = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Vitamina', 'Otro'];

    // Inyectar FormBuilder y Router
    constructor(private fb: FormBuilder, private router: Router) {
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

    submitMedicamento() {
        if (this.medicamentoForm.valid) {
            console.log('✅ Medicamento registrado. Navegando al listado...');
            this.router.navigate(['/medicamento-listado']); // Volver al listado de medicamentos
        } else {
            console.log('❌ Formulario Inválido. Revisar validaciones.');
            this.medicamentoForm.markAllAsTouched();
        }
    }
}