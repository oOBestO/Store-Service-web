import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../app.module';
import { FontMenu } from './interface/guest.model';
import { DataService } from '../data.service';

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
      fontList: FontMenu[] = [];
      drinkList: FontMenu[] = [];
      totalCost: number = 0;
      tableNumber: string = ''; // สมมุติว่าเป็นโต๊ะที่ 1

      onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

        constructor(private router: Router,public messageService: MessageService,public dataService :DataService) {
        } // Inject Service

        isMobile: boolean = false;

        checkMobile = (): void => {
          this.isMobile = window.innerWidth < 768;
        };

      ngOnInit(): void {
        this.checkMobile(); // ✅ เรียกครั้งแรก
        window.addEventListener('resize', this.checkMobile);
        const tableId = localStorage.getItem('tableId');
        if(tableId){
          this.tableNumber = tableId;
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
      const savedOrder = localStorage.getItem('orderData');
      if (savedOrder) {
        this.fontList = JSON.parse(savedOrder);
        console.log("✅ หน้า bill กู้คืนข้อมูลจาก localStorage:", this.fontList);
      }

      

    // คำนวณราคารวม
    this.totalCost = [...this.fontList].reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

      butTonnext(){
        console.log('totalCost',this.totalCost)
        this.router.navigate(['/payment'] , { queryParams: {totalCost: this.totalCost }})
      }
      ngOnDestroy(): void {
        window.removeEventListener('resize', this.checkMobile);
      }
      goBack() {
        this.router.navigate(['/order']);
      }
}
