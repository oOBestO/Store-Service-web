import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Menu } from "../../addmenu/interface/guest.model";
import { SelectedMenu } from "../interface/guest.model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8888/api/menus';

  constructor(private http: HttpClient) {}

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenusByIds(ids: number[]): Observable<Menu[]> {
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenusByIds`, { ids });
  }

}
