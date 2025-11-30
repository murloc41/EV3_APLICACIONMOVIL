import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, IonNote,
    IonBackButton // <-- ¡CORREGIDO! Añadido para el botón de retroceso
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { medkitOutline, trashOutline, createOutline, addCircleOutline, alertCircleOutline } from 'ionicons/icons';

// 1. Definir una interfaz para tipar los datos
interface Medicamento {
    id: number;
    nombre: string;
    dosisMg: number;
    tipo: string;
    usoDelicado: boolean;
}

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
        IonBackButton // <-- ¡CORREGIDO! Incluido en el array
    ]
})
export class MedicamentoListadoPage implements OnInit {

    // 2. Arreglo de datos simulados (Simulación de "Read")
    public medicamentos: Medicamento[] = [
        { id: 101, nombre: 'Amlodipino', dosisMg: 50, tipo: 'Antiinflamatorio', usoDelicado: false },
        { id: 102, nombre: 'Morfina', dosisMg: 10, tipo: 'Analgésico', usoDelicado: true },
        { id: 103, nombre: 'Amoxicilina', dosisMg: 500, tipo: 'Antibiótico', usoDelicado: false },
        { id: 104, nombre: 'Tramadol', dosisMg: 50, tipo: 'Analgésico', usoDelicado: true },
    ];

    constructor(private router: Router) { 
        addIcons({ medkitOutline, trashOutline, createOutline, addCircleOutline, alertCircleOutline });
    }

    ngOnInit() {
    }

    verDetalleMedicamento(medicamentoId: number) {
        console.log(`Navegando a detalle del medicamento ID: ${medicamentoId}`);
    }

    confirmarEliminacion(medicamentoId: number, event: Event) {
        event.stopPropagation(); 
        console.log(`[C.4] Abriendo ion-alert para eliminar medicamento ID: ${medicamentoId}`);
    }
}