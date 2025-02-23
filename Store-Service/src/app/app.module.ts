import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { NgxQRCodeModule  } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    StepperModule,
    FormsModule,
    NgxQRCodeModule  // <-- คุณนำเข้า FormsModule ที่นี่ // <-- เพิ่ม QRCodeModule ที่นี่
  ],
  exports: [
    ButtonModule,
    CalendarModule,
    StepperModule,
    FormsModule,
    NgxQRCodeModule
      // <-- นำออกมาให้ใช้งานในโมดูลอื่น // <-- เพิ่ม QRCodeModule ใน exports ด้วย
  ]
})
export class PrimeNgModule {}
