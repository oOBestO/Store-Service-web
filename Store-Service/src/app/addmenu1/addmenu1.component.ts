import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addmenu1',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenubarModule, FormsModule],
  templateUrl: './addmenu1.component.html',
  styleUrls: ['./addmenu1.component.scss'],
})
export class Addmenu1Component {
  items: MenuItem[] = [];
  imageTitle: string = '';
  imageDescription: string = '';
  selectedFile: File | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-angle-double-left',
        command: () => this.goBack(),
      },
    ];
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

  handleSubmit() {
    console.log('Title:', this.imageTitle);
    console.log('Description:', this.imageDescription);
    if (this.selectedFile) {
      console.log('Uploaded file:', this.selectedFile.name);
    }
  }
  // ✅ ฟังก์ชันที่ทำงานเมื่อคลิกโลโก้
    isMenuOpen = false; // ✅ สร้างตัวแปรเก็บสถานะของเมนู

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
  
}
