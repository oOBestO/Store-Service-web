import { Component, OnInit } from '@angular/core';
import { ComfirmPaymentService } from './Service/service';
import { ChartData, ChartOptions } from 'chart.js';
import { PrimeNgModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  data!: ChartData<'bar' | 'line'>;
  options!: ChartOptions;

  constructor(private orderService: ComfirmPaymentService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getDailySales().subscribe((sales) => {
      // 🔹 ตัดเหลือ 7 วันล่าสุด
      const recentSales = sales.slice(-7); // เอาแค่ 7 วันสุดท้าย

      const labels = recentSales.map((s) =>
        new Date(s.date).toLocaleDateString('th-TH', {
          day: '2-digit',
          month: 'short',
        }) // เช่น 01 เม.ย.
      );
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      const values = recentSales.map((s) => s.totalAmount);

      this.data = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'แนวโน้มยอดขาย',
            data: values,
            borderColor: '#FFA726',
            tension: 0.4,
            fill: false,
          },
          {
            type: 'bar',
            label: 'ยอดขายรายวัน (บาท)',
            data: values,
            backgroundColor: '#42A5F5',
            borderRadius: 6,
          }
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          },
          title: {
            display: true,
            text: 'รายงานยอดขายย้อนหลัง 7 วัน',
            color: textColor
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            },
            beginAtZero: true,
            title: {
              display: true,
              text: 'ยอดขาย (บาท)',
              color: textColorSecondary
            }
          }
        }
      };
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
