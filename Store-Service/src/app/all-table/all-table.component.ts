import { Component } from '@angular/core';
import { GuestService } from './Service/service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import { MessageService } from 'primeng/api';

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

  constructor(private guestService: GuestService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  // ✅ โหลดข้อมูลโต๊ะจากฐานข้อมูล
  loadTables() {
    this.guestService.getTables()
      .subscribe(
        async (data) => {
          console.log("📌 ข้อมูลจาก API:", data);

          if (data) {
            this.tables = data.sort((a, b) => a.index - b.index);

            await Promise.all(
              this.tables.map(async (table) => {
                if (table.index != null) {
                  table.image = await this.loadImage(String(table.index));
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

  // ✅ สร้าง path รูปภาพจาก index → assets/images/table/table_<index>.png
  async loadImage(index: string): Promise<string> {
    return `assets/images/table/table_${index}.png`;
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

  // ✅ ลบโต๊ะตาม id
  deleteTable(id: number) {
    if (confirm('คุณต้องการลบโต๊ะนี้หรือไม่?')) {
      this.guestService.deleteTable(id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบโต๊ะสำเร็จ' });
          this.loadTables(); // โหลดใหม่
        },
        (error) => {
          console.error('❌ เกิดข้อผิดพลาดในการลบโต๊ะ:', error);
          this.messageService.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'ไม่สามารถลบโต๊ะได้' });
        }
      );
    }
  }
}
