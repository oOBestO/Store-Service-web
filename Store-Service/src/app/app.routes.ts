import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { AllTableComponent } from './all-table/all-table.component';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';

export const routes: Routes = [
//  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', component: TableComponent, pathMatch: 'full' },
  { path: '', component: AllTableComponent, pathMatch: 'full' },
  { path: '', component: ReserveTableComponent, pathMatch: 'full' },
  { path: 'reservations/:tableId', component: ReservationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // กำหนด Routing ให้ App
  exports: [RouterModule]
})
export class AppRoutingModule { }
