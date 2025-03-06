import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmenu1Component } from './addmenu1.component';

describe('Addmenu1Component', () => {
  let component: Addmenu1Component;
  let fixture: ComponentFixture<Addmenu1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addmenu1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Addmenu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
