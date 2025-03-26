import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { AllTableComponent } from './all-table/all-table.component';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { TableQrComponent } from './table-qr/table-qr.component';
import { AllTableCustomerComponent } from './all-table-customer/all-table-customer.component';
import { TestHomeComponent } from './testhome/testhome.component';

export const routes: Routes = [
//  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin/addtable', component: TableComponent, pathMatch: 'full' },
  { path: 'admin/table', component: AllTableComponent, pathMatch: 'full' },
  { path: 'reserve', component: ReserveTableComponent, pathMatch: 'full' },
  { path: 'reservations', component: ReservationDetailComponent },
  { path: 'table/all', component: AllTableCustomerComponent },
  { path: 'home', component: TestHomeComponent },
  { path: 'admin/qr', component: TableQrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // กำหนด Routing ให้ App
  exports: [RouterModule]
})
export class AppRoutingModule { }
