import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:Store-Service/src/app/addmenu/addmenu.component.spec.ts
import { AddmenuComponent } from './addmenu.component';

describe('AddmenuComponent', () => {
  let component: AddmenuComponent;
  let fixture: ComponentFixture<AddmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmenuComponent);
========
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableComponent);
>>>>>>>> Home-My:Store-Service/src/app/table/table.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
