import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTableCustomerComponent } from './all-table-customer.component';

describe('AllTableCustomerComponent', () => {
  let component: AllTableCustomerComponent;
  let fixture: ComponentFixture<AllTableCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTableCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTableCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
