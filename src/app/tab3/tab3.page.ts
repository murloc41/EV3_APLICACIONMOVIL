import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { ApiService, Usuario, Post } from '../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { addIcons } from 'ionicons';
import { refreshOutline, peopleOutline, documentTextOutline, checkmarkCircle, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonRefresher,
    IonRefresherContent
  ],
})
export class Tab3Page implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  posts: Post[] = [];
  loading = false;
  apiConectada = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    public apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ refreshOutline, peopleOutline, documentTextOutline, checkmarkCircle, closeCircle });
  }

  ngOnInit() {
    console.log('🚀 Tab3 (API REST) inicializado');
    this.verificarAPI();
    this.cargarDatos();
    
    // Suscribirse al estado de carga
    this.apiService.loading$.pipe(takeUntil(this.destroy$)).subscribe(
      loading => this.loading = loading
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Verificar conectividad con API
   */
  async verificarAPI() {
    this.apiConectada = await this.apiService.verificarConexion();
  }

  /**
   * Cargar datos de la API (GET)
   */
  cargarDatos() {
    this.loading = true;
    
    // GET /users
    this.apiService.obtenerUsuarios().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.usuarios = data.slice(0, 5); // Mostrar solo 5
        this.loading = false;
        console.log('✅ Usuarios cargados:', this.usuarios.length);
      },
      error: async (error) => {
        this.loading = false;
        await this.mostrarError('Error al cargar usuarios', error.message);
      }
    });

    // GET /posts
    this.apiService.obtenerPosts(5).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.posts = data;
        console.log('✅ Posts cargados:', this.posts.length);
      },
      error: (error) => {
        console.error('Error al cargar posts:', error);
      }
    });
  }

  /**
   * Pull-to-refresh
   */
  async refrescar(event: any) {
    await this.verificarAPI();
    this.cargarDatos();
    event.target.complete();
  }

  /**
   * Ver detalle de un usuario (GET por ID)
   */
  async verDetalleUsuario(id: number) {
    this.apiService.obtenerUsuarioPorId(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: async (usuario) => {
        const alert = await this.alertController.create({
          header: usuario.name,
          subHeader: usuario.email,
          message: `
            <strong>Teléfono:</strong> ${usuario.phone}<br>
            <strong>Ciudad:</strong> ${usuario.address.city}<br>
            <strong>Empresa:</strong> ${usuario.company.name}<br>
            <strong>Website:</strong> ${usuario.website}
          `,
          buttons: ['Cerrar']
        });
        await alert.present();
      },
      error: async (error) => {
        await this.mostrarError('Error', error.message);
      }
    });
  }

  /**
   * Crear nuevo usuario (POST)
   */
  async crearUsuario() {
    const alert = await this.alertController.create({
      header: 'Crear Usuario (POST)',
      inputs: [
        { name: 'name', placeholder: 'Nombre completo', type: 'text' },
        { name: 'email', placeholder: 'Email', type: 'email' },
        { name: 'phone', placeholder: 'Teléfono', type: 'tel' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.name && data.email) {
              this.ejecutarPOST(data);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Ejecutar POST request
   */
  private ejecutarPOST(data: any) {
    const nuevoUsuario: Partial<Usuario> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      username: data.name.toLowerCase().replace(/\s/g, ''),
      website: 'ejemplo.com',
      address: { street: '', suite: '', city: 'Santiago', zipcode: '' },
      company: { name: 'Esculappmed' }
    };

    this.apiService.crearUsuario(nuevoUsuario).pipe(takeUntil(this.destroy$)).subscribe({
      next: async (usuario) => {
        await this.mostrarToast(`✅ Usuario creado con ID: ${usuario.id}`, 'success');
        console.log('Usuario creado:', usuario);
      },
      error: async (error) => {
        await this.mostrarError('Error al crear usuario', error.message);
      }
    });
  }

  /**
   * Actualizar usuario (PUT)
   */
  async actualizarUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: `Actualizar ${usuario.name} (PUT)`,
      inputs: [
        { name: 'name', value: usuario.name, placeholder: 'Nombre' },
        { name: 'email', value: usuario.email, placeholder: 'Email' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.ejecutarPUT(usuario.id, data);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Ejecutar PUT request
   */
  private ejecutarPUT(id: number, data: any) {
    this.apiService.actualizarUsuario(id, data).pipe(takeUntil(this.destroy$)).subscribe({
      next: async (usuario) => {
        await this.mostrarToast(`✅ Usuario ${id} actualizado`, 'success');
        console.log('Usuario actualizado:', usuario);
      },
      error: async (error) => {
        await this.mostrarError('Error al actualizar', error.message);
      }
    });
  }

  /**
   * Eliminar usuario (DELETE)
   */
  async eliminarUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar a ${usuario.name}? (DELETE)`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.ejecutarDELETE(usuario.id);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Ejecutar DELETE request
   */
  private ejecutarDELETE(id: number) {
    this.apiService.eliminarUsuario(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: async () => {
        await this.mostrarToast(`✅ Usuario ${id} eliminado`, 'success');
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      },
      error: async (error) => {
        await this.mostrarError('Error al eliminar', error.message);
      }
    });
  }

  /**
   * Mostrar toast notification
   */
  private async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  /**
   * Mostrar alerta de error
   */
  private async mostrarError(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
