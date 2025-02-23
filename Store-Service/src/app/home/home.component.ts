import { Component, NgModule, OnInit } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest } from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimeNgModule  // นำเข้าโมดูลที่รวม PrimeNG
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  [x: string]: any;
  guests: Guest[] = [];
  date: Date = new Date();
  currentStep: number = 1;

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
