import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakDetailComponent } from './streak-detail.component';

describe('StreakDetailComponent', () => {
  let component: StreakDetailComponent;
  let fixture: ComponentFixture<StreakDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreakDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
