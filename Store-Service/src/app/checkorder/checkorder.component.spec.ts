import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOrderComponent } from './checkorder.component';

describe('CheakoderComponent', () => {
  let component: CheckOrderComponent;
  let fixture: ComponentFixture<CheckOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
