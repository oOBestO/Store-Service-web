import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
  ],
  exports: [
    ButtonModule,
    CalendarModule,
    StepperModule,
    StepsModule,
    ToastModule,
  ]
})
export class PrimeNgModule {}
