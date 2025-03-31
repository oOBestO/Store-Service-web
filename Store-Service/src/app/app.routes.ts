import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BillComponent } from './bill/bill.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './Order-food/Order-food.component';
import { SuccessComponent } from './success/success.component';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { AddorderFoodComponent } from './addorder-food/addorder-food.component';
import { TableComponent } from './table/table.component';
import { AllTableComponent } from './all-table/all-table.component';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { TableQrComponent } from './table-qr/table-qr.component';
import { AllTableCustomerComponent } from './all-table-customer/all-table-customer.component';
import { TestHomeComponent } from './testhome/testhome.component';
import { HomeComponent } from './home/home.component';
import { AddphonenumberComponent } from './addphonenumber/addphonenumber.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginHomeComponent } from './loginhome/loginhome.component';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
//{ path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin/addtable', component: TableComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  { path: 'admin/table', component: AllTableComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  { path: 'reserve', component: ReserveTableComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationDetailComponent , canActivate: [AuthGuard] },
  { path: 'table/all', component: AllTableCustomerComponent },
  { path: 'admin/qr', component: TableQrComponent , canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'bill', component: BillComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'success', component: SuccessComponent }, // ✅ ตรวจสอบว่า path: 'success' อยู่จริง
  { path: 'addmenu', component: AddmenuComponent, canActivate: [AuthGuard] },
  { path: 'addorderFood', component: AddorderFoodComponent, canActivate: [AuthGuard] },
  { path: 'addphonenumber', component: AddphonenumberComponent},
  { path: 'confirmpayment', component: ConfirmPaymentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginHomeComponent },
  { path: '', component: LoginHomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // กำหนด Routing ให้ App
  exports: [RouterModule]
})
export class AppRoutingModule { }
