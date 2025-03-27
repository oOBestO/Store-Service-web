import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
//import { HomeComponent } from './app/home/home.component';
import { TableComponent } from './app/table/table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AllTableComponent } from './app/all-table/all-table.component';
import { ReserveTableComponent } from './app/reserve-table/reserve-table.component';
import { ReservationDetailComponent } from './app/reservation-detail/reservation-detail.component';
import { TableQrComponent } from './app/table-qr/table-qr.component';
import { AllTableCustomerComponent } from './app/all-table-customer/all-table-customer.component';
import { TestHomeComponent } from './app/testhome/testhome.component';

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync(),
    provideRouter([
      { path: 'admin/addtable', component: TableComponent },
      { path: 'admin/table', component: AllTableComponent }, 
      { path: 'reserve', component: ReserveTableComponent }, 
      { path: 'reservations', component: ReservationDetailComponent },
      { path: 'admin/qr', component: TableQrComponent },
      { path: 'table/all', component: AllTableCustomerComponent },
      { path: 'home', component: TestHomeComponent },
    ]),
    provideHttpClient()
  ] 
});
