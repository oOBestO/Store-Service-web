import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  declarations: [], // ✅ ถ้าไม่มี Component หรือ Directive ไม่จำเป็นต้องมี
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
    ImageModule,
    VirtualScrollerModule,
    MenubarModule
  ],
  exports: [
    FormsModule, // ✅ Export FormsModule ออกไป
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
    ImageModule,
    MenubarModule,
    VirtualScrollerModule
  ]
})
export class PrimeNgModule {}
