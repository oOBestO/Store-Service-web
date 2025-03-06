import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    QRCodeModule
  ],
  exports: [
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    QRCodeModule
  ]
})
export class PrimeNgModule {}
