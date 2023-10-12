import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeconnexionComponent } from './modal-deconnexion.component';

describe('ModalDeconnexionComponent', () => {
  let component: ModalDeconnexionComponent;
  let fixture: ComponentFixture<ModalDeconnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeconnexionComponent]
    });
    fixture = TestBed.createComponent(ModalDeconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
