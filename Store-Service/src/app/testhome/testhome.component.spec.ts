import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHomeComponent } from './testhome.component';

describe('TesthomeComponent', () => {
  let component: TestHomeComponent;
  let fixture: ComponentFixture<TestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
