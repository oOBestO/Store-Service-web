  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { TableService } from './Service/service';
  import { MessageService } from 'primeng/api';
  import { ToastModule } from 'primeng/toast';

  @Component({
    selector: 'app-reserve-table',
    templateUrl: './reserve-table.component.html',
    styleUrls: ['./reserve-table.component.scss'],
    providers: [MessageService]
  })
  export class ReserveTableComponent implements OnInit {
    tables: any[] = [];
    times: string[] = ['12:00 - 13:30', '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:00 - 19:30'];   
    form!: FormGroup;

    constructor(
      private tableService: TableService,
      private fb: FormBuilder,
      private messageService: MessageService
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
    
        this.tableService.reserveTable(reservationData).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'จองโต๊ะสำเร็จ',
              detail: 'ข้อมูลการจองถูกบันทึกแล้ว!',
            });
            this.form.reset();
            this.ngOnInit();
          },
          (error) => {
            console.error('❌ Error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'เกิดข้อผิดพลาด',
              detail: 'ไม่สามารถจองโต๊ะได้',
            });
          }
        );
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'ข้อมูลไม่ครบถ้วน',
          detail: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        });
      }
    }
    
    parseTimeRange(range: string): { start: string, end: string } {
      const [start, end] = range.split(' - ');
      return { start, end };
    }   
         
}
