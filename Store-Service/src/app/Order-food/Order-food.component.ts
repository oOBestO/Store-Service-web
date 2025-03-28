import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../app.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu ,SelectedMenu ,FontMenu} from './interface/guest.model';  // นำเข้า Model
import { GuestService } from './Service/service';  // นำเข้า Service
import { DataService } from '../data.service'; // ✅ นำเข้า Service


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      CommonModule,
      PrimeNgModule,
    ],
  templateUrl: './Order-food.component.html',
  styleUrl: './Order-food.component.scss',
  providers: [MessageService]
})
export class OrderComponent {
  activeIndex: number = 0;
  items: MenuItem[] | undefined;
  customClass = 'text-yellow';
  selectedMenus: number[] = [];
  menuList : Menu[] = [];
  fontList : FontMenu[] = [];
  showSelectMenuModal = false;
  allMenus: Menu[] = []; // เมนูทั้งหมดจากฐานข้อมูล


  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

    constructor(private ActivatedRoute: ActivatedRoute,public messageService: MessageService ,private router: Router,private GuestService: GuestService,private dataService: DataService) {
    } // Inject Service

  ngOnInit(): void {
    const savedOrder = localStorage.getItem('selectedMenus');
    if (savedOrder) {
      this.selectedMenus = JSON.parse(savedOrder);
      console.log("✅ กู้คืนข้อมูลจาก localStorage:", this.selectedMenus);
    }

    // ✅ 3. ถ้ามีเมนูที่เคยเลือกไว้ ให้ดึงข้อมูลจาก API
    if (this.selectedMenus.length > 0) {
      this.GuestService.getMenusByIds(this.selectedMenus).subscribe(data => {
        console.log("📌 เมนูที่ได้จาก API:", data);

        // ✅ 4. ถ้า `fontList` ว่าง ให้ใช้ข้อมูลจาก API แทน
        if (this.fontList.length === 0) {
          this.fontList = data.map(menu => ({
            id: menu.id,
            menuName: menu.menuName,
            price: menu.price,
            category: menu.category,
            imageUrl: menu.imageUrl,
            quantity:  1
          }));
        }

        // ✅ 5. บันทึกข้อมูลลง `localStorage`
        this.saveToLocalStorage();
      });
    }
    this.items = [
      {
        label: 'รายการอาหาร',
        command: (event: any) => {
          this.router.navigate(['/order']); // ✅ ใช้ this.router อย่างถูกต้อง
        }
      },
      {
        label: 'บิลค่าอาหาร',
        command: (event: any) => {
          this.router.navigate(['/bill']);
        }
      },
      {
        label: 'ชำระเงิน',
        command: (event: any) => {
          this.router.navigate(['/payment']);
        }
      },
      {
        label: 'ชำระเงินเสร็จสิ้น',
        command: (event: any) => {
          this.router.navigate(['/success']);
        }
      }
    ];

    // 📌 กู้คืนข้อมูลจาก `localStorage`
    this.GuestService.getAllMenus().subscribe(data => {
      this.allMenus = data;
    });
  }

 // เปิด Modal เลือกเมนู
 openSelectMenuModal() {
  this.showSelectMenuModal = true;
}

// ✅ เพิ่มเมนูใหม่เข้า Order และบันทึกลง `localStorage`
addMenuToOrder(menu: Menu) {
  const existingMenu = this.fontList.find(m => m.id === menu.id);

  if (existingMenu) {
    existingMenu.quantity++;
  } else {
    this.fontList.push({
      id: menu.id,
      menuName: menu.menuName,
      price: menu.price,
      category: menu.category,
      imageUrl: menu.imageUrl,
      quantity: 1
    });
  }

  this.saveToLocalStorage(); // ✅ บันทึกลง localStorage
  this.showSelectMenuModal = false; // ปิด Modal
}

 // 📌 บันทึกข้อมูลลง `localStorage`
 saveToLocalStorage() {
  console.log("💾 บันทึกข้อมูลลง localStorage:", this.fontList);
  localStorage.setItem('orderData', JSON.stringify(this.fontList));
}

  butTonnext(){
    this.router.navigate(['/bill']);
  }

  // 📌 ปรับจำนวนเมนู
  increaseQuantity(menu: FontMenu) {
    menu.quantity++;
    this.saveToLocalStorage(); // ✅ อัปเดต `localStorage`
  }

  decreaseQuantity(menu: FontMenu) {
    if (menu.quantity > 1) {
      menu.quantity--;
      this.saveToLocalStorage(); // ✅ อัปเดต `localStorage`
    }
  }

  removeMenu(index: number) {
    this.fontList.splice(index, 1);
    this.saveToLocalStorage(); // ✅ อัปเดต `localStorage`
  }

}

