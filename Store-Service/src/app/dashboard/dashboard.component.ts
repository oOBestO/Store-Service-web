import { Component, OnInit } from '@angular/core';
import { ComfirmPaymentService } from './Service/service'; // ปรับ path ตามโปรเจกต์
import { ChartData, ChartOptions } from 'chart.js';
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
       CommonModule,
       PrimeNgModule,
     ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  data!: ChartData<'line'>;
  options!: ChartOptions<'line'>;

  constructor(private orderService: ComfirmPaymentService) {}

  ngOnInit(): void {
    this.orderService.getDailySales().subscribe((sales) => {
      const labels = sales.map((s) => s.date);
      const values = sales.map((s) => s.totalAmount);

      this.data = {
        labels,
        datasets: [
          {
            label: 'ยอดขายรายวัน (บาท)',
            data: values,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.3,
          },
        ],
      };

      this.options = {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'ยอดขาย (บาท)' } },
          x: { title: { display: true, text: 'วันที่' } },
        },
      };
    });
    // this.loadChartData();
  }

  // loadChartData() {
  //   this.orderService.getPaidOrders().subscribe((orders: any[]) => {
  //     const monthlyTotals: { [key: string]: number } = {};

  //     orders.forEach(order => {
  //       const month = new Date(order.createdAt).toLocaleString('default', { month: 'long' });
  //       if (!monthlyTotals[month]) {
  //         monthlyTotals[month] = 0;
  //       }
  //       monthlyTotals[month] += order.totalAmount;
  //     });

  //     const months = Object.keys(monthlyTotals);
  //     const totals = Object.values(monthlyTotals);

  //     this.data = {
  //       labels: months,
  //       datasets: [
  //         {
  //           label: 'ยอดขายรายเดือน',
  //           data: totals,
  //           fill: false,
  //           borderColor: '#FFA726',
  //           tension: 0.4
  //         }
  //       ]
  //     };

  //     this.options = {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'รายงานยอดขายอาหาร (ออเดอร์ที่ชำระแล้ว)'
  //         }
  //       }
  //     };
  //   });
  // }
}

