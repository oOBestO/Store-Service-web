import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // ✅ ทำให้ Service ใช้งานได้ทั่วแอป
})
export class DataService {
  private selectedMenus: number[] = [];

  // ✅ ใช้เก็บค่าระหว่างหน้า
  setMenus(menus: number[]) {
    this.selectedMenus = menus;
    localStorage.setItem('selectedMenus', JSON.stringify(menus)); // ✅ บันทึกลง LocalStorage
  }

  getMenus(): number[] {
    const storedMenus = localStorage.getItem('selectedMenus'); // ✅ ดึงค่าจาก LocalStorage
    return storedMenus ? JSON.parse(storedMenus) : [];
  }

  clearMenus() {
    this.selectedMenus = [];
    localStorage.removeItem('selectedMenus'); // ✅ ล้างค่าใน LocalStorage
  }
}
