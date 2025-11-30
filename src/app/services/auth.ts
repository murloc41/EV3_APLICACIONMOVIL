import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para mantener el estado de login
  private loggedIn = new BehaviorSubject<boolean>(false); 

  // Observable para que otros componentes se suscriban al estado
  isLoggedIn = this.loggedIn.asObservable();

  constructor() { 
    // Cargar el estado desde el almacenamiento local al iniciar la app
    const storedStatus = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(storedStatus);
  }

  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persistir el estado
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn'); // Eliminar el estado
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}