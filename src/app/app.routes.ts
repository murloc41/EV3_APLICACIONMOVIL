import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard'; // ⬅️ AÑADIR ESTO

export const routes: Routes = [
  
  // 1. RUTA POR DEFECTO: Redirige la ruta raíz a la página de Login
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  
  // 2. RUTAS PÚBLICAS (Login y Registro) - NO LLEVAN AuthGuard
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },

  // 3. RUTAS DE LA APLICACIÓN - AÑADIR canActivate: [AuthGuard]
  {
    path: 'tabs', 
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard] // 🔒 Proteger el contenedor principal
  },
  
  // 4. RUTAS DE NAVEGACIÓN DIRECTA - AÑADIR canActivate: [AuthGuard]
  
  {
    path: 'listado', // Listado principal de pacientes
    loadComponent: () => import('./pages/listado/listado.page').then( m => m.ListadoPage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'detalle/:id', 
    loadComponent: () => import('./pages/detalle/detalle.page').then( m => m.DetallePage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'paciente-agregar',
    loadComponent: () => import('./pages/paciente-agregar/paciente-agregar.page').then( m => m.PacienteAgregarPage),
    canActivate: [AuthGuard] // 🔒
  },
  
  // Otras rutas
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.page').then( m => m.AgregarPage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'medicamento-agregar',
    loadComponent: () => import('./pages/medicamento-agregar/medicamento-agregar.page').then( m => m.MedicamentoAgregarPage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'medicamento-listado',
    loadComponent: () => import('./pages/medicamento-listado/medicamento-listado.page').then( m => m.MedicamentoListadoPage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canActivate: [AuthGuard] // 🔒
  },
  {
    path: 'medicamento-detalle/:id', 
    loadComponent: () => import('./pages/medicamento-detalle/medicamento-detalle.page').then(m => m.MedicamentoDetallePage),
    canActivate: [AuthGuard] // 🔒
  }
];