import { Component, OnInit } from '@angular/core';
import { GuestService } from './Service/service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../app.module';
import { Router} from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ToastModule, ConfirmDialogModule],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss'],
  providers: [MessageService, ConfirmationService]
  
})
export class ReservationDetailComponent implements OnInit {

  reservations: any[] = [];

  constructor(
    private guestService: GuestService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
          timeStart: reservation.startTime ?? 'ไม่มีข้อมูล',
          timeEnd: reservation.endTime ?? 'ไม่มีข้อมูล',
          tableIndex: reservation.table?.index ?? reservation.tableIndex ?? 'ไม่มีข้อมูล',
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

  cancelReservation(id: number): void {
    this.confirmationService.confirm({
      message: 'คุณต้องการยกเลิกการจองนี้ใช่ไหม?',
      header: 'ยืนยันการยกเลิก',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'ตกลง',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        this.guestService.deleteReservation(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'ยกเลิกสำเร็จ',
              detail: 'การจองถูกยกเลิกเรียบร้อยแล้ว'
            });
            this.loadReservations(); // โหลดข้อมูลใหม่
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'เกิดข้อผิดพลาด',
              detail: 'ไม่สามารถยกเลิกการจองได้'
            });
            console.error('❌ Error deleting reservation:', error);
          }
        );
      }
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
