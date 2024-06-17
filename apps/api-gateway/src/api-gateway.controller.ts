import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateUserDto } from '../../user-service/src/dto/create-user.dto';
import { UpdateUserDto } from '../../user-service//src/dto/update-user.dto';
import { CreateOrderDto } from '../../order-service/src/dto/create-order.dto';
import { UpdateOrderDto } from '../../order-service/src/dto/update-order.dto';

@Controller()
export class ApiGatewayController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'api-gateway-consumer'
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('get-users');
    this.client.subscribeToResponseOf('get-user');
    this.client.subscribeToResponseOf('create-user');
    this.client.subscribeToResponseOf('update-user');
    this.client.subscribeToResponseOf('delete-user');
    this.client.subscribeToResponseOf('get-orders');
    this.client.subscribeToResponseOf('get-order');
    this.client.subscribeToResponseOf('create-order');
    this.client.subscribeToResponseOf('update-order');
    this.client.subscribeToResponseOf('delete-order');
    await this.client.connect();
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.client.send('create-user', createUserDto);
  }

  @Get('users')
  findAllUsers() {
    return this.client.send('get-users', {});
  }

  @Get('users/:id')
  findOneUser(@Param('id') id: number) {
    return this.client.send('get-user', id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('update-user', { id, ...updateUserDto });
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: number) {
    return this.client.send('delete-user', id);
  }

  @Post('orders')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('create-order', createOrderDto);
  }

  @Get('orders')
  findAllOrders() {
    return this.client.send('get-orders', {});
  }

  @Get('orders/:id')
  findOneOrder(@Param('id') id: number) {
    return this.client.send('get-order', id);
  }

  @Put('orders/:id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.client.send('update-order', { id, ...updateOrderDto });
  }

  @Delete('orders/:id')
  removeOrder(@Param('id') id: number) {
    return this.client.send('delete-order', id);
  }
}

