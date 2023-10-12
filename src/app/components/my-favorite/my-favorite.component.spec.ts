import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteComponent } from './my-favorite.component';

describe('MyFavoriteComponent', () => {
  let component: MyFavoriteComponent;
  let fixture: ComponentFixture<MyFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFavoriteComponent]
    });
    fixture = TestBed.createComponent(MyFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
