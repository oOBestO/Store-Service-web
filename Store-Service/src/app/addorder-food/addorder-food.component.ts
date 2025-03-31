import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../app.module';
import { MessageService } from 'primeng/api';
import { ActivatedRoute  } from '@angular/router';
import { FoodService } from './Service/service';
import { Menu, MenuItems } from './interface/guest.model';  // นำเข้า Model
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-addorder-food',
  standalone: true,
  imports: [
     CommonModule,
     PrimeNgModule,
   ],
  templateUrl: './addorder-food.component.html',
  styleUrl: './addorder-food.component.scss',
  providers: [MessageService]
})
export class AddorderFoodComponent {
  imageBase64: string | null = null;
  menuName: string = '';
  menuPrice: number = 0;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  menuItems: string = '';
  imageFile: File | null = null;
  imageUrl: string = '';
  menu : MenuItems | undefined;
  menuEdit: Menu = {
    id: 0,
    menuName: '',
    price: 0,
    category: '',
    imageUrl: ''
  };
  menuIdedit : number =0;
  id : number = 0;


  constructor(public messageService: MessageService,private router: ActivatedRoute ,private foodService:FoodService,private http :HttpClient) {}

  ngOnInit() {

    this.nameMenu()
    this.editPage()
  }

  nameMenu(){this.router.queryParams.subscribe(param => {
    if (param['menuItems']) {
      this.menuItems = param['menuItems'];
      console.log('succes',this.menuItems)
    }
  });
  }
  onFileSelectedEdit(event: any) {
    this.menuEdit.imageUrl = event.target.files[0];
    if (this.menuEdit.imageUrl) {
      const formData = new FormData();
      formData.append("file", this.menuEdit.imageUrl);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.post<{ imageUrl: string }>("http://localhost:8888/api/upload", formData,{headers}).subscribe(response => {
        this.menuEdit.imageUrl = response.imageUrl; // ✅ ใช้ค่าที่ได้จาก JSON
      }, error => {
        console.error("อัปโหลดไฟล์ล้มเหลว:", error);
      });
    }
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile ) {
      const formData = new FormData();
      formData.append("file", this.imageFile);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.post<{ imageUrl : string }>("http://localhost:8888/api/upload", formData ,{headers}).subscribe(response => {
        this.imageUrl = response.imageUrl; // ✅ ใช้ค่าที่ได้จาก JSON
      }, error => {
        console.error("อัปโหลดไฟล์ล้มเหลว:", error);
      });
    }
  }

  editPage(){
    this.router.queryParams.subscribe(params => {
      this.id = params['menuId'];
      if (this.id && this.id !=0 ) {
        this.foodService.getMenuById(this.id).subscribe(menu => {
          this.menuEdit = menu;
          console.log('Loaded menu:', this.menuEdit);
        });
      }
    });
 }

  saveMenu() {
    this.router.queryParams.subscribe(param => {
      if (param['menuItems']) {
        this.menu= param['menuItems'];
        console.log('succes',this.menuItems)
      }
    });
    if (!this.menuName || !this.menuPrice || !this.menuItems || !this.imageUrl) {
      if(this.id){
        this.foodService.saveOrUpdateMenu(this.menuEdit).subscribe(
          response => {
            console.log("บันทึกสำเร็จ:", response);
          },
          error => {
            console.error("เกิดข้อผิดพลาด:", error);
          }
        );
      } else {
        alert('กรุณากรอกข้อมูลให้ครบ!');
      }
    } else {
          const menuData: Menu = {
            menuName: this.menuName,
            price: this.menuPrice,
            category: this.menuItems,
            imageUrl: this.imageUrl
          };
          this.foodService.saveOrUpdateMenu(menuData).subscribe(
            response => {
              console.log("บันทึกสำเร็จ:", response);
            },
            error => {
              console.error("เกิดข้อผิดพลาด:", error);
              }
            );

      }
  }

  confirm() {
    console.log("เพิ่มเมนู:", this.menuName, "ราคา:", this.menuPrice);
    this.saveMenu()
  }

  clear() {
    alert('เมนูถูกบันทึกเรียบร้อย!');
    this.menuName = '';
    this.menuPrice = 0;
    this.selectedImage = null;
    this.imageUrl = '';
  }
}
