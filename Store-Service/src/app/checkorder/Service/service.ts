import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../models/order.model';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8888/api/orders';

  constructor(private http: HttpClient) {}

  getPaidOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.apiUrl}/paid`);
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl);
  }
  
  confirmDelivered(orderId: number): Observable<any> {
    return this.http.put(`http://localhost:8888/api/orders/${orderId}/deliver`, {}, { responseType: 'text' });
  }  
  
  
  cancelDelivered(orderId: number): Observable<any> {
    return this.http.put(
      `http://localhost:8888/api/orders/${orderId}/cancel-deliver`,
      {},
      { responseType: 'text' }
    );
  }
  
  
}
