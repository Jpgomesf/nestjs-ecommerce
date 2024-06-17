import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created.envent';
import { OrderPaidEvent } from './events/order-paid.event';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      status: 'CREATED',
    });
    const savedOrder = await this.orderRepository.save(order);

    this.kafkaClient.emit(
      'order-events',
      new OrderCreatedEvent(
        savedOrder.id.toString(),
        savedOrder.userId,
        savedOrder.items,
        savedOrder.totalPrice,
      ),
    );

    return savedOrder;
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    const updatedOrder = await this.orderRepository.findOne({ where: { id: id } });

    if (updatedOrder.status === 'PAID') {
      this.kafkaClient.emit(
        'order-events',
        new OrderPaidEvent(updatedOrder.id.toString(), updatedOrder.status),
      );
    }

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
