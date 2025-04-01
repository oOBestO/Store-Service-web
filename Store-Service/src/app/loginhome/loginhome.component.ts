import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import {jwtDecode} from 'jwt-decode';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss'],
  imports: [CommonModule, FormsModule, PrimeNgModule], // ✅ Import FormsModule ตรงนี้ก็พอ
  providers: [MessageService]
})
export class LoginHomeComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}

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
  
          const decodedToken: any = jwtDecode(response.token);
          const role = decodedToken.role;
          localStorage.setItem('role', role);
  
          // ✅ ไม่ต้องแสดง messageService.add เมื่อ login สำเร็จ
          location.href = '/home';
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'เกิดข้อผิดพลาด',
            detail: response.message,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'เข้าสู่ระบบล้มเหลว',
          detail: error.error.message || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
        });
      }
    });
  }
}
