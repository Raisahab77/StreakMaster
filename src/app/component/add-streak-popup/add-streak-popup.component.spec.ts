import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStreakPopupComponent } from './add-streak-popup.component';

describe('AddStreakPopupComponent', () => {
  let component: AddStreakPopupComponent;
  let fixture: ComponentFixture<AddStreakPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStreakPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStreakPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
