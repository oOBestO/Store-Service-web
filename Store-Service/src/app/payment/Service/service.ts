import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Menu } from "../../addmenu/interface/guest.model";
import { SelectedMenu } from "../interface/guest.model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8888/api/orders';

  constructor(private http: HttpClient) {}

  saveOrder(payload: any): Observable<any> {
    return this.http.post('http://localhost:8888/api/orders/save', payload ,{
      responseType: 'json'
    });
  }

  checkPaymentStatus(orderId: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(
      `http://localhost:8888/api/orders/${orderId}/status`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }

}
