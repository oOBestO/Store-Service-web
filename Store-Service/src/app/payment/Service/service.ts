import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Menu } from "../../addmenu/interface/guest.model";
import { SelectedMenu } from "../interface/guest.model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8888/api/payment';

  constructor(private http: HttpClient) {}

   // ✅ ยืนยันการชำระเงิน (เริ่มต้น `pending`)
   confirmPayment(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm/${orderId}`, {});
  }

  // ✅ เช็คสถานะการชำระเงิน
  checkPaymentStatus(orderId: number): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/status/${orderId}`);
  }

  // ✅ อัปเดตสถานะการชำระเงิน
  updatePaymentStatus(orderId: number, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update/${orderId}?status=${status}`, {});
  }

}
