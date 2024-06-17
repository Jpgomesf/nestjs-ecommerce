import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('get-users')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('get-user')
  findOne(id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('create-user')
  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('update-user')
  update({ id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto }) {
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern('delete-user')
  remove(id: number) {
    return this.userService.remove(id);
  }
}

