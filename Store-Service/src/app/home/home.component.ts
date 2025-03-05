import { Component, NgModule, OnInit } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest } from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';


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

  constructor(private guestService: GuestService,public messageService: MessageService) {
  } // Inject Service

  ngOnInit(): void {
    this.addNewGuest(); // โหลดข้อมูลเมื่อ Component ทำงาน
    this.toggleColor();
    this.items = [
      {
          label: 'Personal',
          command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label}),
          routerLink: 'personal'
      },
      {
          label: 'Seat',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label}),
          routerLink: 'personal'
      },
      {
          label: 'Payment',

          command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label}),
          routerLink: 'personal'
      },
      {
          label: 'Confirmation',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label}),
          routerLink: 'personal'
      }
    ];
  }

  toggleColor() {
    this.customClass = this.customClass === 'text-yellow' ? 'text-blue' : 'text-yellow';
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
