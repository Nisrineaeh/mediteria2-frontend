import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTechComponent } from './my-tech.component';

describe('MyTechComponent', () => {
  let component: MyTechComponent;
  let fixture: ComponentFixture<MyTechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTechComponent]
    });
    fixture = TestBed.createComponent(MyTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
