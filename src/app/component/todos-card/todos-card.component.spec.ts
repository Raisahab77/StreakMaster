import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosCardComponent } from './todos-card.component';

describe('TodosCardComponent', () => {
  let component: TodosCardComponent;
  let fixture: ComponentFixture<TodosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
