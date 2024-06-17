import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateUserDto } from '../../user-service/src/dto/create-user.dto';
import { UpdateUserDto } from '../../user-service//src/dto/update-user.dto';

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
}
