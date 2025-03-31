  import { HttpClient } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs/internal/Observable";
  import { Guest } from '../interface/guest.model';

  @Injectable({
    providedIn: 'root'
  })
  export class GuestService {
    private apiUrl = 'http://localhost:8888/api/tables';

    constructor(private http: HttpClient) {}

    getTables(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }  

    saveTable(table: { index: string; seats: string }): Observable<any> {
      return this.http.post<any>(this.apiUrl, table);
    }

    getGuests(): Observable<Guest[]> {
      return this.http.get<Guest[]>(this.apiUrl);
    }

    addGuest(guest: Guest): Observable<Guest> {
      return this.http.post<Guest>(this.apiUrl, guest);
    }

    // ดึงโต๊ะทั้งหมดจาก API
    getAllTables(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/all`);
    }

    // ลบโต๊ะจากระบบ
    deleteTable(tableId: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${tableId}`);
    }

    // อัปเดตข้อมูลโต๊ะ
    updateTable(tableId: number, tableData: Partial<Guest>): Observable<Guest> {
      return this.http.put<Guest>(`${this.apiUrl}/${tableId}`, tableData);
    }

    getTableImage(index: number): Observable<Blob> {
      return this.http.get(`http://localhost:8888/api/tables/image/${index}`, { responseType: 'blob' });
    }    
  }
