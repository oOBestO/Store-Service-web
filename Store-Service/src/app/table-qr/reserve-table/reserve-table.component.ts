import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableService } from './Service/service';

@Component({
  selector: 'app-reserve-table',
  templateUrl: './reserve-table.component.html',
  styleUrls: ['./reserve-table.component.scss']
})
export class ReserveTableComponent implements OnInit {
  tables: any[] = [];
  times = ['12:00 - 13:30', '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:00 - 19:30'];
  form!: FormGroup;

  constructor(
    private tableService: TableService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ดึงโต๊ะที่ว่างจาก Backend
    this.tableService.getAvailableTables().subscribe((data) => {
      this.tables = data;
    });

    this.form = this.fb.group({
      tableId: ['', Validators.required],
      customerName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      reservationTime: ['', Validators.required]
    });
  }

  // ✅ ฟังก์ชันส่งข้อมูลการจองโต๊ะ
  onSubmit() {
    if (this.form.valid) {
      const reservationData = {
        table: { id: this.form.value.tableId },
        customerName: this.form.value.customerName,
        phoneNumber: this.form.value.phoneNumber,
        reservationTime: this.form.value.reservationTime
      };
  
      console.log('🚀 Reservation Data:', reservationData);
  
      this.tableService.reserveTable(reservationData).subscribe(
        (response) => {
          alert('จองโต๊ะสำเร็จ!');
          this.form.reset();
          this.ngOnInit(); // โหลดข้อมูลใหม่หลังจองสำเร็จ
        },
        (error) => {
          console.error('❌ Error:', error);
          alert('เกิดข้อผิดพลาดในการจองโต๊ะ');
        }
      );
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
    }
  }  
}
