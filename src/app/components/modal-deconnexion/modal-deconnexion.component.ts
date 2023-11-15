import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-deconnexion',
  templateUrl: './modal-deconnexion.component.html',
  styleUrls: ['./modal-deconnexion.component.css']
})
export class ModalDeconnexionComponent {

  constructor(private router: Router) { }

  onDisconnect() {
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

  onCancel() {
    this.router.navigate(['/profil']);
  }
}

