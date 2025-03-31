import { OrderItemDTO } from './order-item.model';

export interface OrderDTO {
  id: number;
  tableNumber: number;
  customerName: string;
  totalAmount: number;
  paid: boolean;
  createdAt: string;
  items: OrderItemDTO[];
  delivered: boolean; 
}
