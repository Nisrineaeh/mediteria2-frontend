import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInfosUserComponent } from './modify-infos-user.component';

describe('ModifyInfosUserComponent', () => {
  let component: ModifyInfosUserComponent;
  let fixture: ComponentFixture<ModifyInfosUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyInfosUserComponent]
    });
    fixture = TestBed.createComponent(ModifyInfosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
