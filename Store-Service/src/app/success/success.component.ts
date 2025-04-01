import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { PrimeNgModule } from '../app.module';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  providers: [MessageService, PrimeIcons]
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

  isMobile: boolean = false;

  onActiveIndexChange(event: number): void {
    this.activeIndex = event;
  }


  constructor(
    private router: Router,
    public messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      window.addEventListener('resize', this.checkMobile);

      const customerInfo = localStorage.getItem('customerInfo');
      const orderData = localStorage.getItem('orderData');
      const tableId = localStorage.getItem('tableId');

      if (customerInfo && orderData && tableId) {
        const customer = JSON.parse(customerInfo);
        this.order.customerName = customer.name;
        this.order.customerPhone = customer.phone;
        this.order.items = JSON.parse(orderData);
        this.order.tableNumber = tableId;
        this.order.totalAmount = this.order.items.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
      }
    }

    this.items = [
      { label: 'รายการอาหาร', command: () => this.router.navigate(['/order']) },
      { label: 'บิลค่าอาหาร', command: () => this.router.navigate(['/bill']) },
      { label: 'ชำระเงิน', command: () => this.router.navigate(['/payment']) },
      { label: 'ชำระเงินเสร็จสิ้น', command: () => this.router.navigate(['/success']) }
    ];
  }

  checkMobile = (): void => {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  };

  butTonleft() {
    this.router.navigate(['/payment']);
  }

  downloadReceipt() {
    const element = this.receiptImageRef.nativeElement;
    html2canvas(element).then((canvas: any) => {
      const link = document.createElement('a');
      link.download = `order-table-${this.order.tableNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  goHome() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('customerInfo');
      localStorage.removeItem('orderData');
      localStorage.removeItem('tableId');
    }

    this.router.navigate(['/home']);
  }
}
