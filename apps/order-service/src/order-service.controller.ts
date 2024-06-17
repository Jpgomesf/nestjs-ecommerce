import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order-service.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @MessagePattern('get-orders')
  findAll() {
    return this.orderService.findAll();
  }

  @MessagePattern('get-order')
  findOne(id: number) {
    return this.orderService.findOne(id);
  }

  @MessagePattern('create-order')
  create(createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern('update-order')
  update({ id, updateOrderDto }: { id: number; updateOrderDto: UpdateOrderDto }) {
    return this.orderService.update(id, updateOrderDto);
  }

  @MessagePattern('delete-order')
  remove(id: number) {
    return this.orderService.remove(id);
  }
}
