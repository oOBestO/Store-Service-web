import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss'
})
export class BillComponent {
  constructor() {
    console.log("BillComponent Loaded!"); // ✅ เช็คว่า component โหลดหรือไม่
  }
}
