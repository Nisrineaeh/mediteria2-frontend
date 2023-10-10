import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeditationComponent } from './admin-meditation.component';

describe('AdminMeditationComponent', () => {
  let component: AdminMeditationComponent;
  let fixture: ComponentFixture<AdminMeditationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMeditationComponent]
    });
    fixture = TestBed.createComponent(AdminMeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
