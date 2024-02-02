import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {of} from "rxjs";
import { UsersResponse } from 'src/adapter/dto/users-response';
import {UsersService} from "../service/users.service";
import {User} from "../domain/user";
import {UserRequest} from "./dto/users-request";

@Controller('/users/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  addUser(@Body() request: UserRequest) {
    this.usersService.addUser(UserRequest.toDomain(request));
  }

  @Get(':userId')
  getUsers(@Param('user') userId: number) {
    return of(UsersResponse.fromDomain(this.usersService.getUsers(userId)));
  }
}
