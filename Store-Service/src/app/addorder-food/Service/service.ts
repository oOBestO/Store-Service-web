import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Menu, MenuItems } from '../interface/guest.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8888/api/menus';

  constructor(private http: HttpClient) {}

  postMenu(menuData: MenuItems): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuData);
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }
  
  saveOrUpdateMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiUrl}/save`, menu);
  }
}
