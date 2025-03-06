import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BillComponent } from './app/bill/bill.component';
import { PaymentComponent } from './app/payment/payment.component';
import { OrderComponent } from './app/Order-food/src/app/home/Order-food.component';
import { SuccessComponent } from './app/success/success.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient()
  ]
});
