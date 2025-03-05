import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // ✅ เพิ่มตรงนี้
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideHttpClient() // ✅ ต้องเพิ่มเพื่อให้ใช้งาน HttpClient ได้
  ]
};
