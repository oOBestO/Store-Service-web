import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphonenumberComponent } from './addphonenumber.component';

describe('AddphonenumberComponent', () => {
  let component: AddphonenumberComponent;
  let fixture: ComponentFixture<AddphonenumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddphonenumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddphonenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
