
export interface MenuItems {
  menuName: string;
  price: number;
  category: string;
  imageUrl? : string;
}

export interface imageUrl{
  imageFile : string
}
export interface Menu {
  id?: number;
  menuName: string;
  price: number;
  imageUrl: string;
  category: string;
}
