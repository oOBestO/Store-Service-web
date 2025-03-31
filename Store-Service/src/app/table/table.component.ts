import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { PrimeNgModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { GuestService } from './Service/service';
import { Router} from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ FormsModule เพื่อให้ ngModel ใช้งานได้
    PrimeNgModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [MessageService]
})
export class TableComponent {
  table = { index: '', seats: '' }; // กำหนดค่าเริ่มต้นให้ตัวแปร table

  constructor(private http: HttpClient, private guestService: GuestService,private router: Router ,private messageService: MessageService) {}

  saveTable() {
    const index = Number(this.table.index);
    const seats = Number(this.table.seats);
    if (!Number.isInteger(index) || !Number.isInteger(seats)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'ข้อมูลไม่ถูกต้อง',
        detail: 'กรุณากรอกเลขจำนวนเต็มเท่านั้น'
      });
      return;
    }

    if (!index || index < 1 || index > 300) {
      this.messageService.add({
        severity: 'warn',
        summary: 'เลขโต๊ะไม่ถูกต้อง',
        detail: 'เลขโต๊ะต้องอยู่ระหว่าง 1 ถึง 300'
      });
      return;
    }

    if (!seats || seats < 1) {
      alert('จำนวนที่นั่งต้องไม่เป็นค่าว่างหรือศูนย์');
      return;
    }
    
    this.guestService.saveTable(this.table).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'สำเร็จ',
          detail: 'บันทึกข้อมูลสำเร็จ!',
        });
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'เกิดข้อผิดพลาด',
          detail: 'มีข้อมูลโต๊ะนี้อยู่แล้ว!',
        });
      }
    );
  }
  goBack() {
    this.router.navigate(['/home']);
  }

}
