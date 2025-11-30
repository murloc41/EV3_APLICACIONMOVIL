import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleCircleOutline, medkitOutline, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon,IonButtons, IonButton
  ]
})
export class HomePage implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    addIcons({logOutOutline,peopleCircleOutline,medkitOutline,addCircleOutline});
  }

 ngOnInit() {}
  
  // Método logout que utiliza el servicio
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}