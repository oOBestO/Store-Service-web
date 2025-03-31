import { Component } from '@angular/core';
import { GuestService } from './Service/service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-table-customer', // ✅ เปลี่ยน selector ให้ตรงกับชื่อใหม่
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './all-table-customer.component.html', // ✅ อัปเดตชื่อไฟล์ HTML
  styleUrl: './all-table-customer.component.scss', // ✅ อัปเดตชื่อไฟล์ SCSS
  providers: [MessageService],
})
export class AllTableCustomerComponent {
  tables: any[] = [];
  seatGroups: { seats: number; tables: any[] }[] = [];

  constructor(
    private guestService: GuestService,
    private messageService: MessageService,
    private router: Router
  ) {}

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

  // ✅ ฟังก์ชันสั่งอาหาร
  orderFood(tableId: number) {
    this.router.navigate(['/addphonenumber'], { queryParams: { tableId: tableId } });
  }
}
