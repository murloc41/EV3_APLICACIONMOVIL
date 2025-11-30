import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, 
    IonBackButton // <-- ¡CORREGIDO! Añadido para el botón de retroceso
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircleOutline, trashOutline, createOutline, addCircleOutline } from 'ionicons/icons';

// 1. Definir una interfaz para tipar los datos
interface Paciente {
    id: number;
    nombre: string;
    rut: string;
    piso: number;
    turno: 'Mañana' | 'Tarde' | 'Noche';
}

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
        IonBackButton // <-- ¡CORREGIDO! Incluido en el array
    ]
})
export class ListadoPage implements OnInit {

    // 2. Arreglo de datos simulados (Punto B.3)
    public pacientes: Paciente[] = [
        { id: 1, nombre: 'Ana María Soto', rut: '19.456.789-K', piso: 3, turno: 'Mañana' },
        { id: 2, nombre: 'Roberto González', rut: '15.123.456-7', piso: 5, turno: 'Tarde' },
        { id: 3, nombre: 'Javier Fuentes', rut: '18.987.654-2', piso: 1, turno: 'Noche' },
        { id: 4, nombre: 'Laura Pérez', rut: '20.555.111-9', piso: 3, turno: 'Mañana' },
    ];

    
    constructor() { 
        addIcons({ personCircleOutline, trashOutline, createOutline, addCircleOutline });
    }

    ngOnInit() {
    }

    verDetalle(pacienteId: number) {
        console.log(`Navegando a detalle del paciente ID: ${pacienteId}`);
    }

    confirmarEliminacion(pacienteId: number, event: Event) {
        event.stopPropagation();
        console.log(`[C.4] Abriendo cuadro de diálogo de confirmación para paciente ID: ${pacienteId}`);
    }
}