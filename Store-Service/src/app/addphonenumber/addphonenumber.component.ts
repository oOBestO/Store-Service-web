import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../app.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-addphonenumber',
  standalone: true,
  imports: [CommonModule,
            PrimeNgModule,
            ToastModule],
  templateUrl: './addphonenumber.component.html',
  styleUrl: './addphonenumber.component.scss',
  providers: [MessageService]
})
export class AddphonenumberComponent {
  customerName: string = '';
  customerPhone: string = '';
  tableId : number = 0;
  constructor(private ActivatedRoute: ActivatedRoute,private router: Router, private messageService: MessageService) {}

  ngOnInit(){
    this.ActivatedRoute.queryParams.subscribe(param => {
      if (param['tableId']) {
        this.tableId = param['tableId'];
        console.log('succes',this.tableId)
        localStorage.setItem('tableId', JSON.stringify(this.tableId));
      }
  })
}

submitCustomerInfo() {
  if (this.customerName && this.customerPhone.match(/^\d{10}$/)) {
    const customerData = {
      name: this.customerName,
      phone: this.customerPhone
    };
    localStorage.setItem('customerInfo', JSON.stringify(customerData));
    this.messageService.add({
      severity: 'success',
      summary: 'สำเร็จ',
      detail: 'บันทึกข้อมูลเรียบร้อยแล้ว!'
    });
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1200); // ✅ รอ toast แสดงก่อน redirect
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'ข้อมูลไม่ถูกต้อง',
      detail: 'กรุณากรอกชื่อและเบอร์โทรให้ถูกต้อง (10 หลัก)'
    });
  }
}
  goBack() {
    this.router.navigate(['/table/all']);
  }

}
