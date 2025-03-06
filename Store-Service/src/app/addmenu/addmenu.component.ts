import { Component } from '@angular/core';
import { GuestService } from './Service/service';  // นำเข้า Service
import { Guest ,MenuItems } from './interface/guest.model';  // นำเข้า Model
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  menuItems: string[] = [];
  newItem: string = '';

constructor(private guestService: GuestService,public messageService: MessageService,private router: Router) {
  } // Inject Service

  addItem() {
    if (this.newItem.trim()) {
      this.menuItems.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  removeCategory() {
    this.menuItems = [];
  }

  confirm() {
    console.log("Saved menu:", this.menuItems);
    alert('บันทึกเมนูเรียบร้อย!');
  }
}
