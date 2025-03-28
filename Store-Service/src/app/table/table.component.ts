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
    const index = Number(this.table.index);
    const seats = Number(this.table.seats);
    if (!Number.isInteger(index) || !Number.isInteger(seats)) {
      alert('กรุณากรอกข้อมูลเป็นเลขจำนวนเต็มเท่านั้น');
      return;
    }

    if (!index || index < 1 || index > 300) {
      alert('เลขโต๊ะต้องอยู่ระหว่าง 1 ถึง 300');
      return;
    }


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
