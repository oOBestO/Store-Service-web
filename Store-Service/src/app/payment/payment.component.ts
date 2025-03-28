import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { GuestService } from './Service/service';  // นำเข้า Service

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,
        PrimeNgModule,],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [MessageService]
})
export class PaymentComponent {
activeIndex: number = 2;
  items: MenuItem[] | undefined;
  customClass = 'text-yellow';
  tableNumber: number = 1;
  totalCost: number = 960;
  selectedPayment: string = '';
  qrCodeUrl: string = 'assets/qrcode.png';
  paymentStatus: string = 'pending'; // สถานะเริ่มต้น
  orderId: number = 1234; // สมมุติว่าเป็น orderId
  private pollingSubscription!: Subscription;

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

    constructor(private router: Router,public messageService: MessageService,private ActivatedRoute:ActivatedRoute,private paymentService:GuestService) {
    } // Inject Service

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(param => {
      if (param['totalCost']) {
        this.totalCost= param['totalCost'];
        console.log('succes',this.totalCost)
      }
    });

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
    this.startPollingPaymentStatus();
  }
confirmPayment() {
    if (!this.selectedPayment) {
      alert('กรุณาเลือกวิธีการชำระเงิน!');
      return;
    }

    if (this.selectedPayment === 'qr') {
      this.paymentService.confirmPayment(this.orderId).subscribe(response => {
        console.log(response);
        alert('📌 กรุณาชำระเงินผ่าน QR Code');
      });
    } else {
      alert('📌 กรุณาชำระเงินสดที่พนักงาน');
      this.updatePaymentStatus('paid');
    }
  }

  // ✅ เช็คสถานะการชำระเงินทุก 5 วินาที
  startPollingPaymentStatus() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.paymentService.checkPaymentStatus(this.orderId).subscribe(response => {
        this.paymentStatus = response.status;
        console.log('📌 สถานะล่าสุด:', this.paymentStatus);
        if (this.paymentStatus === 'paid') {
          alert('✅ ชำระเงินเรียบร้อยแล้ว!');
          this.pollingSubscription.unsubscribe();
        }
      });
    });
  }

  // ✅ อัปเดตสถานะการชำระเงิน
  updatePaymentStatus(status: string) {
    this.paymentService.updatePaymentStatus(this.orderId, status).subscribe(response => {
      console.log(response);
      alert('📌 อัปเดตสถานะการชำระเงินแล้ว!');
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
