import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { MeditationService } from 'src/app/services/meditation.service';
import { MédiaService } from 'src/app/services/média.service';

@Component({
  selector: 'app-my-tech',
  templateUrl: './my-tech.component.html',
  styleUrls: ['./my-tech.component.css']
})
export class MyTechComponent {
  meditations: MeditationTechnique[] = [];
  currentUser = +localStorage.getItem('user_id')!;
  mediaImg : any;
  meditAudio: any;
  modalRef!: BsModalRef;
  modal2Ref!:BsModalRef;
  selectedMeditation!: MeditationTechnique;
  meditationToDelete!: number;

  @ViewChild('deleteToast') deleteToast!: ElementRef;


  constructor(private meditationService: MeditationService, private mediaService: MédiaService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadAllMeditations();
  }

  loadMediaForMeditations(): void {
    this.meditations.forEach((meditation) => {
      if (meditation.visualMedia) {
        this.mediaService.getMédiaById(meditation.visualMedia.id).subscribe((data: Blob) => {
          this.createImageFromBlob(data, (dataUrl) => {
            this.mediaImg[meditation.id] = dataUrl;
          });
        });
      }

      if (meditation.audioMedia) {
        this.mediaService.getMédiaById(meditation.audioMedia.id).subscribe((data: Blob) => {
          this.createImageFromBlob(data, (dataUrl: any) => {
            this.meditAudio[meditation.id] = dataUrl;
          });
        });
      }
    });
  }

  createImageFromBlob(image: Blob, callback: (dataUrl: string) => void): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result);
    }
    reader.readAsDataURL(image);
  }

  openModal(template: TemplateRef<any>, meditation: MeditationTechnique) {
    this.selectedMeditation = meditation;
    this.modalRef = this.modalService.show(template);
  }

  open2Modal(template: TemplateRef<any>, meditationId?: number) {
    if (meditationId) {
      this.meditationToDelete = meditationId;
    }
    this.modal2Ref = this.modalService.show(template);
  }

  confirmDelete() {
    if (this.meditationToDelete) {
      this.deleteMeditation(this.meditationToDelete);
    }
  }

 
  loadAllMeditations(): void {
    const userId = this.currentUser;
    this.meditationService.getMeditationsByUserId(userId).subscribe(meditations => {
      this.meditations = meditations.map(meditation => {
        return {
          ...meditation,
          keyword: this.parseKeywords(meditation.keyword)
        };
      });
      this.loadMediaForMeditations();
    });
  }

  parseKeywords(keywordInput: string | string[]): string {
    if (Array.isArray(keywordInput)) {
      return keywordInput.join(', ');
    }
    let formattedString = keywordInput.replace(/[{""}]/g, '');
    const keywords = formattedString.split(',');

    return keywords.join(', ');
  }

  updateMeditation() {
    this.meditationService.updateMeditation(this.selectedMeditation.id, this.selectedMeditation).subscribe(() => {
      
      this.modalRef.hide();
      this.loadAllMeditations();
    }, (error: any) => {
      console.error('Il y a une erreur dans la mise a jour de la technique !', error);
    });

  }

  deleteMeditation(id: number) {
    this.meditationService.deleteMeditation(id).subscribe(() => {
      this.showToast('Méditation supprimée avec succès!')
      this.loadAllMeditations();
    }, (error: any) => {
      console.error('Erreur lors de la suppression de la méditation !', error);
      this.showToast('Erreur lors de la suppression de la méditation !');
    });
  }


  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message
    this.deleteToast.nativeElement.classList.add('show')
  }





}
