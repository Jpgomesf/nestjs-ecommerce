export class UpdateOrderDto {
  userId?: string;
  items?: Array<{ productId: string; quantity: number }>;
  totalPrice?: number;
  status?: string;
}

