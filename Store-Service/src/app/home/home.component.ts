import { Component, NgModule, OnInit } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest } from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]

})

export class HomeComponent implements OnInit {
  [x: string]: any;
  guests: Guest[] = [];
  date: Date = new Date();
  currentStep: number = 1;
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  customClass = 'text-yellow';

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

  constructor(private guestService: GuestService,public messageService: MessageService,private router: Router) {
  } // Inject Service

  ngOnInit(): void {
    this.addNewGuest(); // โหลดข้อมูลเมื่อ Component ทำงาน
    this.items = [
      {
        label: 'รายการอาหาร',
        command: (event: any) => {
          this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label });
          this.router.navigate(['/order']); // ✅ ใช้ this.router อย่างถูกต้อง
        }
      },
      {
        label: 'บิลค่าอาหาร',
        command: (event: any) => {
          this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label });
          this.router.navigate(['/bill']);
        }
      },
      {
        label: 'ชำระเงิน',
        command: (event: any) => {
          this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label });
          this.router.navigate(['/payment']);
        }
      },
      {
        label: 'ชำระเงินเสร็จสิ้น',
        command: (event: any) => {
          console.log("Navigating to /success");
          this.router.navigate(['/success']);
        }
      }
    ];
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
