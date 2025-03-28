import { Component } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest ,MenuItems ,Menu} from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-addmenu',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.scss',
  providers: [MessageService]
})
export class AddmenuComponent {
  menuItem: string[] = [];
  newItem: string = '';
  menuItems: Menu[] = [];
  menuName: string = '';
  menuPrice: number | null = null;
  filteredMenuItems: Menu[] = [];

constructor(private guestService: GuestService,public messageService: MessageService,private router: Router,private http:HttpClient) {
  } // Inject Service

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.http.get<Menu[]>('http://localhost:8888/api/menus').subscribe(response => {
      this.menuItems = response;
      console.log("เมนูที่โหลด:", this.menuItems);
    });
  }

  uniqueCategories(): string[] {
    return [...new Set(this.menuItems.map(menu => menu.category))];
  }


   // ✅ ลบเมนู
   deleteMenu(id: number) {
    this.http.delete(`http://localhost:8888/api/menus/${id}`).subscribe(() => {
      alert('ลบเมนูสำเร็จ!');
      this.loadMenus();
    });
  }

  // ✅ แก้ไขเมนู
  editMenu(menu: Menu) {
    this.router.navigate(['/addorderFood'], { queryParams: { menuId: menu.id }});
  }

  addItem() {
    if (this.newItem.trim()) {
      this.menuItem.push(this.newItem.trim());
      this.router.navigate(['/addorderFood'], { queryParams: { menuItems: this.newItem }});
      this.newItem = '';
    }
  }

  confirm() {
    console.log("Saved menu:", this.menuItems);
    alert('บันทึกเมนูเรียบร้อย!');
  }
}
