import { Component, NgModule, OnInit } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Menu } from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../data.service'; // ✅ นำเข้า Service

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]

})

export class HomeComponent implements OnInit {
  menus: Menu[] = [];
  groupedMenus: { [category: string]: Menu[] } = {};
  selectedMenus: number[]=[] // ✅ ใช้ `Set` เพื่อเก็บ ID ของเมนูที่ถูกเลือก
  categoryKeys: string[] = []; // ✅ ใช้ตัวแปรเก็บ key ของหมวดหมู่
  randomMenus: Menu[] = []; // ✅ เมนูแนะนำที่ถูกสุ่ม
  showConfirmButton = false;
  tokens: string | null = null;

  constructor(private getAllMenus: GuestService, private router: Router,private dataService: DataService) {}

  ngOnInit() {
  const token = localStorage.getItem('token');
  this.tokens = token;
  const customerInfo = localStorage.getItem('customerInfo');
  const tableId = localStorage.getItem('tableId');

  this.showConfirmButton = !!customerInfo && !!tableId; // true ถ้ามีทั้งคู่
    this.getAllMenus.getAllMenus().subscribe(data => {
      this.menus = data;
      this.groupMenusByCategory();
      this.getRandomMenus();

    });
  }


  groupMenusByCategory() {
    this.groupedMenus = this.menus.reduce((acc, menu) => {
      if (!acc[menu.category]) {
        acc[menu.category] = [];
      }
      acc[menu.category].push(menu);
      return acc;
    }, {} as { [category: string]: Menu[] });
    this.categoryKeys = Object.keys(this.groupedMenus); // ✅ ใช้ตัวแปรแทน Object.keys()
  }

  getRandomMenus() {
    const shuffledMenus = [...this.menus].sort(() => 0.5 - Math.random());
    this.randomMenus = shuffledMenus.slice(0, 3); // ✅ เลือก 3 เมนูแบบสุ่ม
  }

  toggleSelection(menu: Menu) {
    if (this.selectedMenus.some(m => m === menu.id)) {
      this.selectedMenus = this.selectedMenus.filter(m => m !== menu.id); // ✅ เอาออกถ้าถูกเลือกซ้ำ
    } else {
      this.selectedMenus.push(menu.id); // ✅ เพิ่มเข้า Array ถ้าไม่ซ้ำ
    }
  }

  confirmSelection() {
    console.log("📌 ส่งเมนู:", this.selectedMenus);
    this.dataService.setMenus(this.selectedMenus);
    this.router.navigate(['/order']);
  }
  goBack() {
    this.router.navigate(['/addphonenumber']);
  }
}
