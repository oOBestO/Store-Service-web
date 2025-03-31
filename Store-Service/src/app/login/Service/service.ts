import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Guest } from '../interface/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8888/api/guests';

  constructor(private http: HttpClient) {}

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

}

@Injectable({
  providedIn: 'root'
})
export class PicService {

  private apiUrl = 'http://localhost:8888/api/pictures';  // URL ของ API ใน Spring Boot

  constructor(private http: HttpClient) { }

  // ฟังก์ชันที่ใช้ดึงข้อมูลรูปทั้งหมดจาก API
  getAllPictures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
