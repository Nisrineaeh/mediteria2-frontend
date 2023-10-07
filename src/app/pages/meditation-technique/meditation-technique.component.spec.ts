import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationTechniqueComponent } from './meditation-technique.component';

describe('MeditationTechniqueComponent', () => {
  let component: MeditationTechniqueComponent;
  let fixture: ComponentFixture<MeditationTechniqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeditationTechniqueComponent]
    });
    fixture = TestBed.createComponent(MeditationTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
