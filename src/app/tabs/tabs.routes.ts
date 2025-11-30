import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'paciente', // Pestaña 1: Agregar Paciente
        loadComponent: () =>
          import('../pages/paciente-agregar/paciente-agregar.page').then((m) => m.PacienteAgregarPage),
      },
      {
        path: 'medicamento', // Pestaña 2: Agregar Medicamento
        loadComponent: () =>
          import('../pages/medicamento-agregar/medicamento-agregar.page').then((m) => m.MedicamentoAgregarPage),
      },
      {
        path: '',
        redirectTo: '/tabs/paciente', // Redirige la ruta /tabs/ a la primera pestaña de registro
        pathMatch: 'full',
      },
    ],
  },
];