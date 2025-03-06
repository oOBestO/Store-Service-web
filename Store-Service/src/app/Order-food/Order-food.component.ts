import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../app.module';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

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

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

    constructor(private router: Router,public messageService: MessageService) {
    } // Inject Service

  ngOnInit(): void {
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
  }
  butTonnext(){
    this.router.navigate(['/bill']);
  }
}
