import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {UserRequest} from "./dto/users-request";

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/mocks")
  initializeUsers() {
    return this.usersService.initializeUsers();
  }

  @Post("/new-user")
  addUser(@Body() request: UserRequest) {
    return this.usersService.addUser(UserRequest.toDomain(request));
  }

  @Get('/details/:userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Get('/all-except-for/:userId')
  getUsers(@Param('userId') userId: number) {
    return this.usersService.getUsers(userId);
  }

  @Get('/all/users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
