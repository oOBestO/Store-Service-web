import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://localhost:8888/api/tables';

  constructor(private http: HttpClient) {}

  // ✅ ดึงโต๊ะที่ว่าง
  getAvailableTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available`);
  }

  // ✅ ดึงโต๊ะทั้งหมด
  getAllTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // ✅ ดึงโต๊ะตาม ID
  getTableById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ อัปเดตข้อมูลโต๊ะ
  updateTable(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  reserveTable(data: any) {
    return this.http.post('http://localhost:8888/api/tables/reserve', data);
  }
  
  getAvailableTablesByTime(start: string, end: string) {
    return this.http.get<any[]>(`http://localhost:8888/api/reservations/available?start=${start}&end=${end}`);
  }  
  
}
