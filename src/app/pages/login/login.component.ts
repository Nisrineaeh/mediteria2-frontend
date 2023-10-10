import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            // Stocker le token dans le localStorage
            localStorage.setItem('access_token', response.accessToken);

            console.log('Connexion réussie et token stocké!');
            this.router.navigate(['/profil']);
          } else {
            console.error('Token non reçu dans la réponse.');
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
        },
      });
    }
  }

}
