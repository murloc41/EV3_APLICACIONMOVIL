import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PacienteService } from './services/paciente.service';
import { MedicamentoService } from './services/medicamento.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private pacienteService: PacienteService,
    private medicamentoService: MedicamentoService
  ) {
    // Los servicios se inicializan automáticamente al ser inyectados
    // Esto asegura que Storage esté listo antes que cualquier componente
    console.log('✅ App inicializada - Storage listo');
  }
}
