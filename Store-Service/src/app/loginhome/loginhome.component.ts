import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss'],
  imports: [CommonModule, FormsModule, PrimeNgModule], // ✅ Import FormsModule ตรงนี้ก็พอ
})
export class LoginHomeComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('token');         // ✅ ลบ token
    localStorage.removeItem('customerInfo');  // ✅ ลบข้อมูลอื่นๆ ถ้ามี
    localStorage.removeItem('orderData');
    localStorage.removeItem('tableId');
    localStorage.removeItem('role');
  }

  login() {
    this.http.post<any>('http://localhost:8888/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          // 👇 Decode เพื่อดู role
          const decodedToken: any = jwtDecode(response.token);
          const role = decodedToken.role; // สมมติ backend ใส่ role มาใน payload
          console.log('decodedToken',role); // ดูว่า token มี role หรือเปล่า
          localStorage.setItem('role', role); // ✅ เก็บ role ไว้
          location.href = '/home'; // หรือ path หน้าแรก
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert(`Login Failed: ${error.error.message || 'Server Error'}`);
      }
    });
  }
}
