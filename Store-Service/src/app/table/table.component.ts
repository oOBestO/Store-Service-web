import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { PrimeNgModule } from '../app.module';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ FormsModule เพื่อให้ ngModel ใช้งานได้
    PrimeNgModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tables: any[] = []; // ✅ เก็บข้อมูลของแต่ละโต๊ะ

  addTable() {
    this.tables.push({
      checked: false, // ✅ ค่า checkbox แยกกัน
      seats: null,    
      count: null     
    });
  }
}
