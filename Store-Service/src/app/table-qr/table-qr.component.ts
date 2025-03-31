import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-qr',
  standalone: true,
  imports: [QRCodeModule, CommonModule,ButtonModule],
  templateUrl: './table-qr.component.html',
  styleUrls: ['./table-qr.component.scss']
})
export class TableQrComponent implements OnInit {
  qrCodeData: string = '';

  constructor(private router: Router) {
          }

  ngOnInit(): void {
    this.generateQRCode();
  }

  // ✅ กำหนด URL โดยตรง
  generateQRCode() {
    this.qrCodeData = 'http://localhost:4200/table/all';
    console.log('✅ QR Code Data:', this.qrCodeData);
  }
  goBack() {
    this.router.navigate(['/admin/table']);
  }
}
