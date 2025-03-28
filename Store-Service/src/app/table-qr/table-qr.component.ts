import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-qr',
  standalone: true,
  imports: [QRCodeModule, CommonModule],
  templateUrl: './table-qr.component.html',
  styleUrls: ['./table-qr.component.scss']
})
export class TableQrComponent implements OnInit {
  qrCodeData: string = '';

  ngOnInit(): void {
    this.generateQRCode();
  }

  // ✅ กำหนด URL โดยตรง
  generateQRCode() {
    this.qrCodeData = 'http://localhost:4200/table/all';
    console.log('✅ QR Code Data:', this.qrCodeData);
  }
}
