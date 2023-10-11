import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { MeditationService } from 'src/app/services/meditation.service';
import { MédiaService } from 'src/app/services/média.service';

@Component({
  selector: 'app-add-meditation',
  templateUrl: './add-meditation.component.html',
  styleUrls: ['./add-meditation.component.css']
})
export class AddMeditationComponent {
  meditationForm: FormGroup;
  audioMediaId!: number;
  visualMediaId!: number;
  currentUser = +localStorage.getItem('user_id')!;

  constructor(
    private fb: FormBuilder,
    private meditationService: MeditationService,
    private médiaService: MédiaService
  ) {
    this.meditationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, Validators.required],
      atmosphere: ['', Validators.required],
      keyword:['', Validators.required],
      audio_media_id: [null, Validators.required],
      visual_media_id: [null, Validators.required],
      
    });
  }

  onSubmit() {
   console.log('FORMULAIRE ENVOYER',this.meditationForm.value)
    if (this.meditationForm.valid) {

      
      const meditationData = {
        name: this.meditationForm.get('name')?.value,
        description: this.meditationForm.get('description')?.value,
        duration: this.meditationForm.get('duration')?.value,
        atmosphere: this.meditationForm.get('atmosphere')?.value,
        keyword: this.meditationForm.get('keyword')?.value.split(',').map((keyword: string)=> keyword.trim()),
        user_id: this.currentUser,
        audio_media_id: this.audioMediaId,

        visual_media_id: this.visualMediaId
      };

      console.log('DATA ENVOYER AU BACKEND  : ', meditationData)
      // Envoyez les données à l'API
      this.meditationService.addMeditation(meditationData).subscribe({
        next: response => {
          // Gérez la réponse du backend ici (par exemple, une redirection ou un message de succès)
          console.log('Réponse du backend :', response);
          console.log('this.currentUser:', this.currentUser);
          console.log('this.audioMediaId:', this.audioMediaId);
          console.log('this.visualMediaId:', this.visualMediaId);

        },
        error: error => {
          // Gérez les erreurs ici
          console.error('Erreur lors de l’ajout de la méditation:', error);
        }
      });

    } else {
      // Affichez un message d'erreur ou effectuez une action en cas de formulaire invalide
      console.error('Formulaire invalide. Assurez-vous de remplir tous les champs requis et d’uploader les médias.');
    }
  }


  onAudioSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('monFichier', file);

    this.médiaService.postMédia(formData).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          console.log('Audio enregistré avec succès. ID:', response.id);
          this.audioMediaId = response.id;
          alert('Média audio enregistré avec succès');
        }
      },
      error: error => {
        console.error('Erreur lors de lupload du média audio :', error);
        alert('Erreur lors de lenregistrement du média audio');
      }
    });
  }


  onVisualSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('monFichier', file);

    this.médiaService.postMédia(formData).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          console.log('Visuel enregistré avec succès. ID:', response.id);
          this.visualMediaId = response.id;
          alert('Média visuel enregistré avec succès');
        }
      },
      error: error => {
        console.error('Erreur lors de lupload du média visuel :', error);
        alert('Erreur lors de lenregistrement du média visuel');
      }
    });
  }




}

