// service.ts หรือ staff.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComfirmPaymentService {
  private baseUrl = 'http://localhost:8888/api/orders';

  constructor(private http: HttpClient) {}

  // ✅ ดึงข้อมูลออร์เดอร์ตาม ID
  getOrderById(orderId: number) {
    return this.http.get(`${this.baseUrl}/${orderId}`);
  }

  getAllUnpaidOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all-unpaid`);
  }

  updatePaymentStatus(orderId: number, paid: boolean) {
    return this.http.put(
      `${this.baseUrl}/${orderId}/status?paid=${paid}`,
      null,
      { responseType: 'text' } // ✅ ป้องกัน JSON parsing error
    );
  }
}
