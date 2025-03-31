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
    times: string[] = ['12:00 - 13:30', '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:00 - 19:30'];   
    form!: FormGroup;

    constructor(
      private tableService: TableService,
      private fb: FormBuilder
    ) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        tableId: ['', Validators.required],
        customerName: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        reservationTime: ['', Validators.required]
      });
    
      // ✅ เมื่อผู้ใช้เลือกเวลา จะดึงโต๊ะที่ว่างในช่วงเวลานั้น
      this.form.get('reservationTime')?.valueChanges.subscribe((timeRange: string) => {
        if (timeRange) {
          const { start, end } = this.parseTimeRange(timeRange);
          this.tableService.getAvailableTablesByTime(start, end).subscribe((data: any) => {
            this.tables = data;
            this.form.get('tableId')?.reset();
          });
        }
      });
    }
      

    // ✅ ฟังก์ชันส่งข้อมูลการจองโต๊ะ
    onSubmit() {
      if (this.form.valid) {
        const { start, end } = this.parseTimeRange(this.form.value.reservationTime);
    
        const reservationData = {
          table: { id: this.form.value.tableId },
          customerName: this.form.value.customerName,
          phoneNumber: this.form.value.phoneNumber,
          startTime: start,
          endTime: end
        };
    
        console.log('🚀 Reservation Data:', reservationData);
    
        this.tableService.reserveTable(reservationData).subscribe(
          (response) => {
            alert('จองโต๊ะสำเร็จ!');
            this.form.reset();
            this.ngOnInit();
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
    
    parseTimeRange(range: string): { start: string, end: string } {
      const [start, end] = range.split(' - ');
      return { start, end };
    }   
         
}
