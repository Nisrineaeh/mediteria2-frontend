import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  addUser!: FormGroup;
  newUser!: User;

  @ViewChild('deleteToast') deleteToast!: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      description: new FormControl(''),
      check: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    let newUser: User = { ...this.addUser.value };
    
    this.authService.addUser(newUser).subscribe({
      next: () => {
        this.showToast('Utilisateur ajouté avec succès !');
        this.addUser.reset();
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }

  OnAddUser() {
    let newUser: User = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    console.log(newUser);
  }

  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message
    this.deleteToast.nativeElement.classList.add('show')
  }


 
}

