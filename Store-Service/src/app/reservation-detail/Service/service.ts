import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private baseUrl = 'http://localhost:8888/api/reservations';

  constructor(private http: HttpClient) {}

  // ✅ ดึงข้อมูลการจองทั้งหมด
  getReservations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  // ✅ เพิ่มฟังก์ชัน deleteReservation เพื่อลบการจองตาม ID
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
