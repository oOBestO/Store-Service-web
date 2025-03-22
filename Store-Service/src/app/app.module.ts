import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';

@NgModule({
  declarations: [
    ReserveTableComponent
  ],
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
    ReactiveFormsModule,
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
    ReactiveFormsModule,
  ]
})
export class PrimeNgModule {}
