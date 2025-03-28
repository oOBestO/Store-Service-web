import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorderFoodComponent } from './addorder-food.component';

describe('AddorderFoodComponent', () => {
  let component: AddorderFoodComponent;
  let fixture: ComponentFixture<AddorderFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddorderFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddorderFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
