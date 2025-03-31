import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenubarModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] = [];
  imageTitle: string = '';
  imageDescription: string = '';
  selectedFile: File | null = null;
  userRole: string = '';

  constructor(private router: Router) {}

    ngOnInit() {
      this.items = [
        {
          icon: 'pi pi-angle-double-left',
          command: () => this.goBack(),
        },
      ];
      if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.userRole = decodedToken.role; // ตัวแปร role
        }
      }
    }

    goBack() {
      this.router.navigate(['/previous-page']);
    }

    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        console.log('Selected file:', this.selectedFile.name);
      }
    }

    logout() {
      localStorage.removeItem('token');         // ✅ ลบ token
      localStorage.removeItem('customerInfo');  // ✅ ลบข้อมูลอื่นๆ ถ้ามี
      localStorage.removeItem('orderData');
      localStorage.removeItem('tableId');
      localStorage.removeItem('role');
      location.href = '/login';
    }

    handleSubmit() {
      console.log('Title:', this.imageTitle);
      console.log('Description:', this.imageDescription);
      if (this.selectedFile) {
        console.log('Uploaded file:', this.selectedFile.name);
      }
    }
    // ✅ ฟังก์ชันที่ทำงานเมื่อคลิกโลโก้
      isMenuOpen = false; // ✅ สร้างตัวแปรเก็บสถานะของเมนู
      isSubMenuOpen = false;

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
    toggleSubMenu() {
      this.isSubMenuOpen = !this.isSubMenuOpen;
    }
    ngOnDestroy(): void {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('hasRefreshedDashboard');
      }
    }
  }

