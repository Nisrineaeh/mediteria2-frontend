import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  @ViewChild('addToast') addToast!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private meditationService: MeditationService,
    private médiaService: MédiaService,
    private router: Router,
  ) {
    this.meditationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(0)]],
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
      this.meditationService.addMeditation(meditationData).subscribe({
        next: response => {
          
          console.log('Réponse du backend :', response)
          console.log('this.currentUser:', this.currentUser)
          console.log('this.audioMediaId:', this.audioMediaId)
          console.log('this.visualMediaId:', this.visualMediaId)
          this.showToast('Méditation ajoutée avec succès 🧘 !')
          setTimeout(()=>{
            this.router.navigate(['/medtech']);
          }, 3000)
        },
        error: error => {
          console.error('Erreur lors de l\’ajout de la méditation:', error);
          this.showToast('Erreur lors de l’ajout de la méditation')
        }
      });

    } else {
      console.error('Formulaire invalide. Assurez-vous de remplir tous les champs requis et d\’uploader les médias.');
      this.showToast('Formulaire invalide. Veuillez vérifier les champs.')
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
          // alert('Média audio enregistré avec succès');
        }
      },
      error: error => {
        console.error('Erreur lors de lupload du média audio :', error);
        // alert('Erreur lors de lenregistrement du média audio');
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
          // alert('Média visuel enregistré avec succès');
        }
      },
      error: error => {
        console.error('Erreur lors de lupload du média visuel :', error);
        alert('Erreur lors de lenregistrement du média visuel');
      }
    });
  }


  showToast(message: string) {
    this.addToast.nativeElement.querySelector('.toast-body').textContent = message
    this.addToast.nativeElement.classList.add('show')
  }
 

}

