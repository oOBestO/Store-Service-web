import { Component, OnInit } from '@angular/core';
import { GuestService } from './Service/service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reservations: any[] = [];

  constructor(
    private guestService: GuestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.guestService.getReservations().subscribe(
      (data) => {
        console.log("📌 ข้อมูลจาก API:", data);
        this.reservations = data.map((reservation: any) => ({
          id: reservation.id ?? null,
          customerName: reservation.customerName ?? 'ไม่มีข้อมูล',
          phoneNumber: reservation.phoneNumber ?? 'ไม่มีข้อมูล',
          reservationTime: reservation.reservationTime ?? 'ไม่มีข้อมูล',
          tableIndex: reservation.table?.index ?? reservation.tableIndex ?? 'ไม่มีข้อมูล', // ✅ ดึงค่า tableIndex ให้ถูกต้อง
          table: reservation.table ? {
            id: reservation.table.id ?? null,
            index: reservation.table.index ?? reservation.tableIndex ?? 'ไม่มีข้อมูล',
            seats: reservation.table.seats ?? 'ไม่มีข้อมูล'
          } : null
        }));
      },
      (error) => console.error('❌ Error loading reservations:', error)
    );
  }

  confirmReservation(id: number): void {
    alert(`✅ การจองโต๊ะที่ ${id} ได้รับการยืนยันแล้ว!`);
  }

  cancelReservation(id: number): void {
    if (confirm('คุณต้องการยกเลิกการจองนี้ใช่ไหม?')) {
      this.guestService.deleteReservation(id).subscribe(
        () => {
          alert(`❌ ยกเลิกการจองโต๊ะสำเร็จ!`);
          this.loadReservations(); // ✅ โหลดข้อมูลใหม่หลังจากยกเลิก
        },
        (error) => console.error('❌ Error deleting reservation:', error)
      );
    }
  }
}
