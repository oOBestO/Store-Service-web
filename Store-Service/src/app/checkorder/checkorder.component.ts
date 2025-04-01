import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './Service/service';
import { OrderDTO } from './models/order.model';
import { Router} from '@angular/router';
import { PrimeNgModule } from '../app.module';

@Component({
  selector: 'app-checkorder',
  standalone: true,
  imports: [CommonModule,PrimeNgModule],
  templateUrl: './checkorder.component.html',
  styleUrls: ['./checkorder.component.scss']
})
export class CheckOrderComponent implements OnInit {
  orders: OrderDTO[] = [];

  // ✅ โต๊ะจำลองไว้ตรงนี้
  tables = [
    { id: 16, index: 2, seats: 6 },
    { id: 18, index: 3, seats: 1 },
    { id: 19, index: 1, seats: 1 },
    { id: 20, index: 4, seats: 2 },
    { id: 33, index: 5, seats: 10 }
  ];

  constructor(private orderService: OrderService,private router: Router) {}

  ngOnInit(): void {
    this.orderService.getPaidOrders().subscribe({
      next: (data: OrderDTO[]) => {
        console.log('✅ Orders ที่ได้จาก backend:', data);
        this.orders = data.filter(order => this.isToday(order.createdAt));
      },
      error: (err: any) => {
        console.error('❌ ดึง orders ไม่ได้:', err);
      }
    });
  }  

  getTableIndex(tableId: number): number | string {
    const table = this.tables.find(t => t.id === tableId);
    return table ? table.index : 'ไม่พบ';
  }

  confirmDelivery(orderId: number): void {
    this.orderService.confirmDelivered(orderId).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) order.delivered = true;
      },
      error: (err) => {
        console.error('❌ เกิดข้อผิดพลาด:', err);
      }
    });
  }
  
  
  cancelDelivery(orderId: number): void {
    this.orderService.cancelDelivered(orderId).subscribe(() => {
      const order = this.orders.find(o => o.id === orderId);
      if (order) order.delivered = false;
    });
  }
  goBack() {
    this.router.navigate(['/order']);
  }
  
  isToday(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
  
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  
}
