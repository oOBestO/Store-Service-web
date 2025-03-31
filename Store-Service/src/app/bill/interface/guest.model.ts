

export interface Menu {
  id: number;
  menuName: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity?:number;
}

export interface SelectedMenu {
  menu: Menu;
  quantity: number;
}

export interface FontMenu {
  id: number;
  menuName: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number; // ✅ เพิ่ม quantity ไว้ที่นี่เลย
}
