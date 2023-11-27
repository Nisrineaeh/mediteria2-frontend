import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  connexion!: FormGroup;

  @ViewChild('loginToast') loginToast!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.connexion = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnConnect() {
    if (this.connexion.valid) {
      let username = this.connexion.value.username;
      let password = this.connexion.value.password;
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response)
          if (response && response.accessToken) {
            localStorage.setItem('access_token', response.accessToken)

            console.log('Connexion réussie et token stocké!')
            this.showToast('Vous êtes maintenant connecté à la plateforme !')
            setTimeout(() => {
              this.router.navigate(['/profil']);
            }, 2000)

          } else {
            console.error('Token non reçu dans la réponse.')
            this.showToast('Erreur d\'identification !')
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error)
          this.showToast('Erreur lors de la connexion !')
        },
      });
    }
  }

  showToast(message: string) {
    this.loginToast.nativeElement.querySelector('.toast-body').textContent = message;
    this.loginToast.nativeElement.classList.add('show');
  }

  showToasts(message: string) {
    const toastEl = this.loginToast.nativeElement;
    toastEl.querySelector('.toast-body').textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }



}
