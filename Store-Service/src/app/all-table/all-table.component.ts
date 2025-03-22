import { Component } from '@angular/core';
import { GuestService } from './Service/service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-all-table',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './all-table.component.html',
  styleUrl: './all-table.component.scss',
  providers: [MessageService],
})
export class AllTableComponent {
  tables: any[] = [];
  seatGroups: { seats: number; tables: any[] }[] = [];
  isLoading = false; // ✅ ตัวแปรสำหรับตรวจสอบสถานะโหลด

  constructor(private guestService: GuestService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  // ✅ โหลดข้อมูลโต๊ะจากฐานข้อมูล
  loadTables() {
    this.isLoading = true;
    this.guestService.getTables()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        async (data) => {
          console.log("📌 ข้อมูลจาก API:", data);
  
          if (data) {
            this.tables = data.sort((a, b) => a.index - b.index);
  
            await Promise.all(
              this.tables.map(async (table) => {
                if (table.index != null) {
                  table.image = await this.loadImage(table.index);
                } else {
                  console.warn("⚠️ โต๊ะไม่มี index:", table);
                }
              })
            );
  
            this.groupBySeats(); 
          } else {
            console.warn('⚠️ No table data found');
          }
        },
        (error) => {
          console.error("❌ Error loading tables:", error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tables' });
        }
      );
  }   

  // ✅ โหลดรูปภาพจาก table_number
  loadImage(index: number) {
    this.guestService.getTableImage(index).subscribe(
      (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.tables.find((t) => t.index === index).imageUrl = objectURL;
      },
      (error) => console.error('Error loading image:', error)
    );
  }
  

  // ✅ จัดกลุ่มโต๊ะตามจำนวนที่นั่ง
  groupBySeats() {
    const grouped = new Map<number, any[]>();

    this.tables.forEach((table) => {
      if (!grouped.has(table.seats)) {
        grouped.set(table.seats, []);
      }
      grouped.get(table.seats)?.push(table);
    });

    this.seatGroups = Array.from(grouped, ([seats, tables]) => ({
      seats,
      tables: tables.sort((a, b) => a.index - b.index),
    }));
  }

  // ✅ ลบโต๊ะตาม id (โดยไม่จัดเรียงใหม่)
  deleteTable(id: number) {
    if (confirm('คุณต้องการลบโต๊ะนี้หรือไม่?')) {
      this.guestService.deleteTable(id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบโต๊ะสำเร็จ' });

          // ✅ โหลดข้อมูลใหม่จากฐานข้อมูลหลังจากลบ
          this.loadTables();
        },
        (error) => {
          console.error('❌ เกิดข้อผิดพลาดในการลบโต๊ะ:', error);
          this.messageService.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'ไม่สามารถลบโต๊ะได้' });
        }
      );
    }
  }

  // ✅ ฟังก์ชันสำหรับดาวน์โหลดรูปภาพ
  downloadImage(base64Image: string, index: number) {
    if (base64Image) {
      const link = document.createElement('a');
      link.href = base64Image;
      link.download = `table_${index}.png`;
      link.click();
    }
  }
}
