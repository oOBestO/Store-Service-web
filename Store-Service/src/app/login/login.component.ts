import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ToastModule, StepsModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoPath: string | undefined;

  constructor(private http: HttpClient,private routes:Router) { }

  ngOnInit() {
    // สมมุติว่าเราเรียก API หรือได้ path ของโลโก้จากที่อื่น
    this.logoPath = "https://lh3.googleusercontent.com/d/1h8qLiCqY5WebsDwAxS9fHqifQgA-nxQM=w500";
  }

  loginbotton(){
    this.routes.navigate(['/loginhome'])
  }
}
