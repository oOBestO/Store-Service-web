import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { GuestService } from './Service/service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [MessageService]
})
export class PaymentComponent {
  isConfirming = false;
  showWaitingModal = false;
  activeIndex: number = 2;
  items: MenuItem[] | undefined;
  customClass = 'text-yellow';
  tableNumber: number = JSON.parse(localStorage.getItem('tableId') || '[]');
  totalCost: number = 960;
  selectedPayment: string = '';
  qrCodeUrl: string = 'assets/images/2601907D-9AAE-493E-9C37-D98B75556284.jpg';
  paymentStatus: string = 'pending';
  orderId: number | null = null;
  private pollingSubscription!: Subscription;

  constructor(
    private router: Router,
    public messageService: MessageService,
    private ActivatedRoute: ActivatedRoute,
    private paymentService: GuestService
  ) {}

  isMobile: boolean = false;

  checkMobile = (): void => {
    this.isMobile = window.innerWidth < 768;
  };

  ngOnInit(): void {
    this.checkMobile(); // ✅ เรียกครั้งแรก
    window.addEventListener('resize', this.checkMobile);

    this.ActivatedRoute.queryParams.subscribe(param => {
      if (param['totalCost']) {
        this.totalCost = param['totalCost'];
        console.log('succes', this.totalCost);
      }
    });

    this.items = [
      { label: 'รายการอาหาร', command: () => this.router.navigate(['/order']) },
      { label: 'บิลค่าอาหาร', command: () => this.router.navigate(['/bill']) },
      { label: 'ชำระเงิน', command: () => this.router.navigate(['/payment']) },
      { label: 'ชำระเงินเสร็จสิ้น', command: () => this.router.navigate(['/success']) }
    ];
  }

  confirmPayment() {
    if (this.isConfirming) return;
    this.isConfirming = true;
    this.showWaitingModal = true;

    const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
    const orderData = JSON.parse(localStorage.getItem('orderData') || '[]');

    const payload = {
      tableNumber: this.tableNumber,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      totalAmount: this.totalCost,
      paid: false,
      items: orderData.map((item: any) => ({
        menuName: item.menuName,
        price: item.price,
        quantity: item.quantity
      }))
    };

    this.paymentService.saveOrder(payload).subscribe({
      next: (res: any) => {
        console.log('✅ Order saved', res);
        this.orderId = res.orderId;
        this.startPollingPaymentStatus();
      },
      error: (err) => {
        console.error('❌ Error saving payment:', err);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        this.isConfirming = false;
        this.showWaitingModal = false;
      }
    });
  }

  startPollingPaymentStatus() {
    if (!this.orderId) {
      console.error('⛔ ยังไม่มี orderId สำหรับตรวจสอบสถานะการชำระเงิน');
      return;
    }

    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }

    this.pollingSubscription = interval(5000).subscribe(() => {
      this.paymentService.checkPaymentStatus(this.orderId!).subscribe({
        next: (response: any) => {
          this.paymentStatus = response.status;
          console.log('📌 สถานะล่าสุด:', this.paymentStatus);
          if (this.paymentStatus === 'paid') {
            this.showWaitingModal = false;
            this.isConfirming = false;
            this.pollingSubscription.unsubscribe();
            this.router.navigate(['/success']);
          }
        },
        error: (err) => {
          console.error('❌ Error checking status:', err);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  
    window.removeEventListener('resize', this.checkMobile);
  }
  
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  goBack() {
    this.router.navigate(['/bill']);
  }
}
