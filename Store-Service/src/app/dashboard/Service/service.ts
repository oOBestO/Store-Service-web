import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Menu } from "../../addmenu/interface/guest.model";
import { SelectedMenu } from "../interface/guest.model";

@Injectable({
  providedIn: 'root'
})
export class ComfirmPaymentService {
  private apiUrl = 'http://localhost:8888/api/orders';

  constructor(private http: HttpClient) {}

  getPaidOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paid`);
  }
  
  getDailySales(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8888/api/orders/daily-sales');
  }

}
