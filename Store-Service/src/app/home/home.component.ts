import { Component, OnInit } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest } from './interface/guest.model';  // นำเข้า Model

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
[x: string]: any;
  guests: Guest[] = []; // เก็บข้อมูล Guest ที่ได้จาก API

  constructor(private guestService: GuestService) {
  } // Inject Service

  ngOnInit(): void {
    this.addNewGuest(); // โหลดข้อมูลเมื่อ Component ทำงาน
  }

  // ดึงข้อมูล Guest ทั้งหมดจาก API
  getAllGuests() {
    this.guestService.getGuests().subscribe((data) => {
      this.guests = data;
      console.log(this.guests);
    });
  }

  // ส่งข้อมูล Guest ใหม่ไปยัง API
  addNewGuest() {
    const newGuest: Guest = {
      name: 'Michael',
      email: 'michael@email.com'
    };

    this.guestService.addGuest(newGuest).subscribe((response) => {
      console.log('เพิ่ม Guest สำเร็จ:', response);
      this.getAllGuests(); // โหลดข้อมูลใหม่
    });
  }
}
