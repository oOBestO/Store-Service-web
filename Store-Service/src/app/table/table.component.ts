import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { PrimeNgModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { GuestService } from './Service/service';


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
  table = { index: '', seats: '' }; // กำหนดค่าเริ่มต้นให้ตัวแปร table

  constructor(private http: HttpClient, private guestService: GuestService) {}

  saveTable() {
    this.guestService.saveTable(this.table).subscribe(
      (response) => {
        console.log('Response:', response);
        alert('บันทึกข้อมูลสำเร็จ!');
      },
      (error) => {
        console.error('Error:', error);
        alert('มีข้อมูลโต็ะนี้อยู่แล้ว');
      }
    );
  }
  
}
