import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms'; 
import { Router } from '@angular/router';
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonButtons, IonBackButton, IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBackOutline, personAddOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
        IonInput, IonButton, IonIcon, IonButtons, IonBackButton, IonText
    ]
})
export class RegistroPage implements OnInit {

    registroForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) { 
        addIcons({ saveOutline, arrowBackOutline, personAddOutline, lockClosedOutline, mailOutline });
    }

    ngOnInit() {
        this.registroForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        });
    }

    submitRegistro() {
        if (this.registroForm.invalid) {
            this.registroForm.markAllAsTouched();
            console.log('❌ Formulario de registro inválido. Revise los campos.');
            return;
        }

        const { password, confirmPassword } = this.registroForm.value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            console.log('❌ Error: Las contraseñas no coinciden.');
            return;
        }

        // Simulación de registro exitoso
        console.log('✅ Usuario registrado con éxito:', this.registroForm.value.email);
        
        // Redirigir al usuario al Login después del registro
        this.router.navigate(['/login']);
    }

}
