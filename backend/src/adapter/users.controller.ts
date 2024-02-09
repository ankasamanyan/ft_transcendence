import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {from, of} from "rxjs";
import { UsersResponse } from 'src/adapter/dto/users-response';
import {UsersService} from "../service/users.service";
import {UserRequest} from "./dto/users-request";

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  initializeUsers() {
    return this.usersService.initializeUsers();
  }

  @Post()
  addUser(@Body() request: UserRequest) {
    return this.usersService.addUser(UserRequest.toDomain(request));
  }

  @Get('/details/:userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Get('/:userId')
  getUsers(@Param('userId') userId: number) {
    return this.usersService.getUsers(userId);
  }
}
