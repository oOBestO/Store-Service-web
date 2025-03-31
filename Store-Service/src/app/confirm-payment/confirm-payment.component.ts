import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComfirmPaymentService } from './Service/service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [
      CommonModule,
      PrimeNgModule,
      ToastModule
    ],
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
  providers: [MessageService]
})
export class ConfirmPaymentComponent {
  orderId: number | null = null;
  orderDetails: any = null;
  isLoading = true;
  orderList: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ComfirmPaymentService: ComfirmPaymentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // ✅ ไม่ต้องใช้ queryParams แล้ว
    this.loadUnpaidOrders();
  }

  loadUnpaidOrders() {
    this.ComfirmPaymentService.getAllUnpaidOrders().subscribe({
      next: (res) => {
        this.orderList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading unpaid orders:', err);
        this.isLoading = false;
      }
    });
  }

  confirmPayment(orderId: number) {
    this.ComfirmPaymentService.updatePaymentStatus(orderId, true).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'สำเร็จ',
          detail: 'ยืนยันการชำระเงินเรียบร้อย!'
        });
        this.loadUnpaidOrders();
      },
      error: (err) => {
        console.error('❌ Error confirming payment:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'เกิดข้อผิดพลาด',
          detail: 'ไม่สามารถยืนยันการชำระเงินได้'
        });
      }
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
