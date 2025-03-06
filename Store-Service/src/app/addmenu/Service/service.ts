import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Guest, MenuItems } from '../interface/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8888/api/guests';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItems[]> {
    return this.http.get<MenuItems[]>(this.apiUrl);
  }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

}
