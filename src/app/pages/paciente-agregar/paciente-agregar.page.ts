import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Necesario para la navegación post-registro
import { 
    FormBuilder, 
    FormGroup, 
    Validators, 
    ReactiveFormsModule 
} from '@angular/forms'; 

import { 
    IonContent, IonHeader, IonTitle, IonToolbar,  IonItem, 
    IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonText,
    IonButtons, IonIcon, IonBackButton // <-- ¡CORRECCIÓN: Añadido IonIcon, IonButtons y IonBackButton!
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { saveOutline, personAddOutline } from 'ionicons/icons';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
    selector: 'app-paciente-agregar',
    templateUrl: './paciente-agregar.page.html',
    styleUrls: ['./paciente-agregar.page.scss'],
    standalone: true,
    imports: [
        IonContent, IonHeader, IonTitle, IonToolbar, 
        CommonModule, 
        ReactiveFormsModule,
         IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonText,
        IonButtons, IonIcon, IonBackButton // <-- ¡CORRECCIÓN: Incluidos en el array!
    ]
})
export class PacienteAgregarPage implements OnInit {

    pacienteForm!: FormGroup;
    turnos = ['Mañana', 'Tarde', 'Noche'];
    private readonly ID_PATTERN = /^[0-9]{7,9}-[0-9kK]$/; 

    // Inyectar FormBuilder y Router para la navegación
    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private pacienteService: PacienteService
    ) {
        addIcons({ saveOutline, personAddOutline });
    } 

    ngOnInit() {
        this.pacienteForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            idPaciente: ['', [
                Validators.required, 
                Validators.pattern(this.ID_PATTERN) 
            ]],
            piso: ['', [
                Validators.required,
                Validators.min(1),
                Validators.pattern(/^[0-9]*$/)
            ]],
            turno: ['', Validators.required]
        });
    }

    async submitPaciente() {
        if (this.pacienteForm.valid) {
            try {
                const nuevosPacienteData = {
                    nombre: this.pacienteForm.get('nombre')?.value,
                    rut: this.pacienteForm.get('idPaciente')?.value,
                    piso: this.pacienteForm.get('piso')?.value,
                    turno: this.pacienteForm.get('turno')?.value
                };

                await this.pacienteService.crearPaciente(nuevosPacienteData);
                console.log('✅ Paciente registrado. Navegando al listado...');
                this.router.navigate(['/listado']);
            } catch (error) {
                console.error('❌ Error al crear paciente:', error);
            }
        } else {
            console.log('❌ Formulario Inválido. Revisar validaciones.');
            this.pacienteForm.markAllAsTouched();
        }
    }
}