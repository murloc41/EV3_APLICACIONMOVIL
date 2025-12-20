import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, retry, timeout } from 'rxjs/operators';

/**
 * Interfaces para datos de API externa (JSONPlaceholder)
 */
export interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Servicio para consumir APIs REST externas
 * Cumple con requisitos de eximición: HTTP GET/POST/PUT/DELETE
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';
  private readonly TIMEOUT_MS = 10000; // 10 segundos

  // Estados de carga para mostrar spinners
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Contador de requests activos
  private activeRequests = 0;

  constructor(private http: HttpClient) {
    console.log('✅ ApiService inicializado - Base URL:', this.BASE_URL);
  }

  /**
   * GET - Obtener todos los usuarios
   * Endpoint: GET /users
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.BASE_URL}/users`).pipe(
      timeout(this.TIMEOUT_MS),
      retry(2), // Reintentar 2 veces en caso de error
      tap(() => console.log('✅ GET /users - Usuarios obtenidos')),
      catchError(this.handleError)
    );
  }

  /**
   * GET - Obtener un usuario por ID
   * Endpoint: GET /users/:id
   */
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/users/${id}`).pipe(
      timeout(this.TIMEOUT_MS),
      tap(user => console.log(`✅ GET /users/${id} - Usuario obtenido:`, user.name)),
      catchError(this.handleError)
    );
  }

  /**
   * POST - Crear un nuevo usuario (simulado)
   * Endpoint: POST /users
   */
  crearUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    this.setLoading(true);
    
    return this.http.post<Usuario>(`${this.BASE_URL}/users`, usuario).pipe(
      timeout(this.TIMEOUT_MS),
      tap(newUser => console.log('✅ POST /users - Usuario creado:', newUser)),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * PUT - Actualizar un usuario existente (simulado)
   * Endpoint: PUT /users/:id
   */
  actualizarUsuario(id: number, datos: Partial<Usuario>): Observable<Usuario> {
    this.setLoading(true);
    
    return this.http.put<Usuario>(`${this.BASE_URL}/users/${id}`, datos).pipe(
      timeout(this.TIMEOUT_MS),
      tap(updated => console.log(`✅ PUT /users/${id} - Usuario actualizado:`, updated)),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * DELETE - Eliminar un usuario (simulado)
   * Endpoint: DELETE /users/:id
   */
  eliminarUsuario(id: number): Observable<any> {
    this.setLoading(true);
    
    return this.http.delete(`${this.BASE_URL}/users/${id}`).pipe(
      timeout(this.TIMEOUT_MS),
      tap(() => console.log(`✅ DELETE /users/${id} - Usuario eliminado`)),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * GET - Obtener posts (ejemplo adicional)
   * Endpoint: GET /posts
   */
  obtenerPosts(limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`).pipe(
      timeout(this.TIMEOUT_MS),
      map(posts => posts.slice(0, limit)), // Limitar resultados
      tap(posts => console.log(`✅ GET /posts - ${posts.length} posts obtenidos`)),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `❌ Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `❌ Código de error: ${error.status}\nMensaje: ${error.message}`;
      
      // Mensajes amigables según código HTTP
      switch (error.status) {
        case 0:
          errorMessage = '❌ No hay conexión a internet';
          break;
        case 404:
          errorMessage = '❌ Recurso no encontrado (404)';
          break;
        case 500:
          errorMessage = '❌ Error en el servidor (500)';
          break;
        case 401:
          errorMessage = '❌ No autorizado (401)';
          break;
        case 403:
          errorMessage = '❌ Acceso prohibido (403)';
          break;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Control de estado de carga
   */
  private setLoading(isLoading: boolean): void {
    if (isLoading) {
      this.activeRequests++;
    } else {
      this.activeRequests--;
    }
    
    this.loadingSubject.next(this.activeRequests > 0);
  }

  /**
   * Verificar conectividad con la API
   */
  async verificarConexion(): Promise<boolean> {
    try {
      await this.http.get(`${this.BASE_URL}/users/1`, { observe: 'response' })
        .pipe(timeout(5000))
        .toPromise();
      console.log('✅ Conexión con API verificada');
      return true;
    } catch (error) {
      console.error('❌ Sin conexión con API:', error);
      return false;
    }
  }
}
