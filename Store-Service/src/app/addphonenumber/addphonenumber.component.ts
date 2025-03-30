import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../app.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addphonenumber',
  standalone: true,
  imports: [CommonModule,
            PrimeNgModule],
  templateUrl: './addphonenumber.component.html',
  styleUrl: './addphonenumber.component.scss'
})
export class AddphonenumberComponent {
  customerName: string = '';
  customerPhone: string = '';
  tableId : number = 0;
  constructor(private ActivatedRoute: ActivatedRoute,private router: Router) {}

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
      console.log('✅ ข้อมูลถูกบันทึกใน localStorage แล้ว');
      alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
      this.router.navigate(['/home']);
    } else {
      alert('กรุณากรอกชื่อและเบอร์โทรให้ถูกต้อง (10 หลัก)');
    }
  }

}
