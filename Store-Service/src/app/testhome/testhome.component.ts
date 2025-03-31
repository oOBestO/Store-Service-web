import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from './Service/service';

@Component({
  selector: 'app-test-home',
  templateUrl: './testhome.component.html',
  styleUrls: ['./testhome.component.scss']
})
export class TestHomeComponent implements OnInit {
  tableId: number | null = null;
  index: number | null = null;

  // ✅ ตัวอย่างรายการเมนู
  menuItems = [
    {
      id: 1,
      name: 'ข้าวผัดกะเพรา',
      description: 'ข้าวผัดกะเพราไก่ไข่ดาว เสิร์ฟพร้อมผักสด',
      price: 50,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'ข้าวผัดหมู',
      description: 'ข้าวผัดหมูพร้อมเครื่องเคียง',
      price: 45,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'น้ำส้มคั้นสด',
      description: 'น้ำส้มคั้นสดจากส้มธรรมชาติ',
      price: 30,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'ผัดไทยกุ้งสด',
      description: 'ผัดไทยกุ้งสดพร้อมถั่วลิสงและมะนาว',
      price: 60,
      image: 'https://via.placeholder.com/150'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private guestService: GuestService // ✅ Inject TableService
  ) {}

  ngOnInit(): void {
    // ✅ รับค่า tableId จาก queryParams
    this.route.queryParams.subscribe(params => {
      console.log('✅ Query Params:', params);

      this.tableId = params['tableId'] ? +params['tableId'] : null;

      if (this.tableId) {
        console.log(`🍽️ สั่งอาหารจากโต๊ะที่: ${this.tableId}`);

        // ✅ ดึง index จาก database ตาม tableId
        this.getTableIndex(this.tableId);
      }
    });
  }

  // ✅ ฟังก์ชันดึง index จาก tableId
  getTableIndex(id: number) {
    this.guestService.getTables().subscribe(
      (tables) => {
        console.log('📋 ข้อมูลทั้งหมดจาก Database:', tables);
        const table = tables.find(t => t.id === id);
        if (table) {
          this.index = table.index;
          console.log(`🔢 Index ของโต๊ะ: ${this.index}`);
        } else {
          console.warn(`⚠️ ไม่พบโต๊ะที่มี id = ${id}`);
        }
      },
      (error) => {
        console.error('❌ Error loading table data:', error);
      }
    );
  }
}
