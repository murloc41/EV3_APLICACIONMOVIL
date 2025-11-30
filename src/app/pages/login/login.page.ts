import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Necesario para la navegación
import { 
  FormBuilder, FormGroup, Validators, ReactiveFormsModule // Para el formulario
} from '@angular/forms'; 
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonText, IonNote, IonButtons // Componentes de Ionic (IonBackdrop eliminado)
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonText, IonNote, IonButtons
    // IonBackdrop fue eliminado
  ]
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  mensajeError: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    addIcons({ logInOutline });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]], 
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  iniciarSesion() {
    this.mensajeError = null;

    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;

      if (usuario === 'admin@mail.com' && contrasena === '123456') {
        
        // 🔥 LLAMADA CLAVE: Establecer la sesión
        this.authService.login(); 
        
        console.log('✅ Autenticación exitosa. Navegando a home.');
        this.router.navigate(['/home']); // Redirige a la página protegida
      } else {
        console.log('❌ Credenciales inválidas.');
        this.mensajeError = 'Usuario o contraseña incorrectos.';
      }
    } else {
      console.log('❌ Formulario de Login inválido.');
      this.loginForm.markAllAsTouched();
    }
  }

  // Método para navegar al registro
  irARegistro() {
    // CORRECCIÓN 2: Navegar a la página de registro (ruta pública)
    this.router.navigate(['/registro']);
  }
}