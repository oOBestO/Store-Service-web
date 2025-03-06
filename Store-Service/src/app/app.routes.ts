import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BillComponent } from './bill/bill.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './Order-food/src/app/home/Order-food.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'bill', component: BillComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'success', component: SuccessComponent }, // ✅ ตรวจสอบว่า path: 'success' อยู่จริง
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // กำหนด Routing ให้ App
  exports: [RouterModule]
})
export class AppRoutingModule { }
