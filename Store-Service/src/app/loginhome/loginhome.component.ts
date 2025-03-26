import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss'],
  imports: [CommonModule, FormsModule], // ✅ Import FormsModule ตรงนี้ก็พอ
})
export class LoginHomeComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8888/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          localStorage.setItem('token', response.token);
          alert(response.message); // ✅ แสดงข้อความจาก Backend
          this.router.navigate(['/addmenu1']);
        } else {
          alert(response.message); // ✅ แสดงข้อความ Error
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert(`Login Failed: ${error.error.message || 'Server Error'}`); // ✅ จัดการข้อความ Error จาก Server
      }
    });
  }
}
