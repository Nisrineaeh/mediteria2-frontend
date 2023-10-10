import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationDetailsComponent } from './meditation-details.component';

describe('MeditationDetailsComponent', () => {
  let component: MeditationDetailsComponent;
  let fixture: ComponentFixture<MeditationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeditationDetailsComponent]
    });
    fixture = TestBed.createComponent(MeditationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
