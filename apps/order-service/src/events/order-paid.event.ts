export class OrderPaidEvent {
  constructor(
    public readonly orderId: string,
    public readonly status: string,
  ) { }
}
