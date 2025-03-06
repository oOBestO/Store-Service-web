import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
//import { HomeComponent } from './app/home/home.component';
import { TableComponent } from './app/table/table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync(),
    provideRouter([
      { path: '', component: TableComponent } // ตั้งค่า Home เป็นหน้าแรก
    ]),
    provideHttpClient()
  ]
});
