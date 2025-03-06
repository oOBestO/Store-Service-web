import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../app.module';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule,
    PrimeNgModule,],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
  providers: [MessageService]
})
export class BillComponent {
    activeIndex: number = 1;
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
        this.router.navigate(['/payment']);
      }
      butTonleft(){
        this.router.navigate(['/order']);
      }
}
