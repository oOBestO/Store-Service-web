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

  saveTable(table: { index: string; seats: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, table);
  }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }
  
}
