import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService , PrimeIcons,} from 'primeng/api';
import { PrimeNgModule } from '../app.module';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule,
          PrimeNgModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  providers: [MessageService,PrimeIcons]
})
export class SuccessComponent {
  activeIndex: number = 3;
    items: MenuItem[] | undefined;
    customClass = 'text-yellow';
    @ViewChild('receiptImage') receiptImageRef!: ElementRef;
    order: any = {
      customer: {},
      items: [],
      tableNumber: '',
      totalAmount: 0
    };

    onActiveIndexChange(event: number) {
      this.activeIndex = event;
    }

    constructor(private router: Router,public messageService: MessageService) {
    } // Inject Service


    ngOnInit(): void {
    const customerInfo = localStorage.getItem('customerInfo');
    const orderData = localStorage.getItem('orderData');
    const tableId = localStorage.getItem('tableId');

    if (customerInfo && orderData && tableId) {
      const customer = JSON.parse(customerInfo);
      this.order.customerName = customer.name;
      this.order.customerPhone = customer.phone;
      this.order.items = JSON.parse(orderData);
      this.order.tableNumber = tableId;
      this.order.totalAmount = this.order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
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
    }
    butTonleft(){
      this.router.navigate(['/payment']);
    }

    downloadReceipt() {
      const element = this.receiptImageRef.nativeElement;
      html2canvas(element).then((canvas:any) => {
        const link = document.createElement('a');
        link.download = `order-table-${this.order.tableNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }

    goHome() {
      localStorage.removeItem('customerInfo');  // ✅ ลบข้อมูลอื่นๆ ถ้ามี
      localStorage.removeItem('orderData');
      localStorage.removeItem('tableId');

      this.router.navigate(['/home']); // เปลี่ยนตาม route ของคุณ
    }
}
