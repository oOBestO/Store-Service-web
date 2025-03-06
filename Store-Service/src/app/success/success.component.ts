import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService , PrimeIcons,} from 'primeng/api';
import { PrimeNgModule } from '../app.module';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule,
          PrimeNgModule,],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  providers: [MessageService,PrimeIcons]
})
export class SuccessComponent {
  activeIndex: number = 3;
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
    butTonleft(){
      this.router.navigate(['/payment']);
    }
}
