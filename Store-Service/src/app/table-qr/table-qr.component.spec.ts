import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQrComponent } from './table-qr.component';

describe('TableQrComponent', () => {
  let component: TableQrComponent;
  let fixture: ComponentFixture<TableQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
