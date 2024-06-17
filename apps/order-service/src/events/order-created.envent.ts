export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly items: Array<{ productId: string; quantity: number }>,
    public readonly totalPrice: number,
  ) { }
}
