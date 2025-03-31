export interface Guest {
  name: string;
  email: string;
}
export interface MenuItems {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  recommended: boolean;
}

export interface Menu {
  id: number;
  menuName: string;
  price: number;
  imageUrl: string;
  category: string;
}
