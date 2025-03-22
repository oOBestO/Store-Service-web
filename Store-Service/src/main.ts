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

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync(),
    provideRouter([
      //{ path: '', component: TableComponent },
      //{ path: '', component: AllTableComponent }, 
      //{ path: '', component: ReserveTableComponent }, 
      { path: '', component: ReservationDetailComponent }
    ]),
    provideHttpClient()
  ]
});
