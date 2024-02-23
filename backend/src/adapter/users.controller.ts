import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {from, of} from "rxjs";
import { UsersResponse } from 'src/adapter/dto/users-response';
import {UsersService} from "../service/users.service";
import {UserRequest} from "./dto/users-request";
import {FTAuthGuard} from "../auth/guards/auth.42.guard";
import {JWTAuthGuard} from "../auth/guards/auth.jwt.guard";

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JWTAuthGuard)
  @Post("/mocks")
  initializeUsers() {
    return this.usersService.initializeUsers();
  }

  // @UseGuards(JWTAuthGuard)
  @Post("/new-user")
  addUser(@Body() request: UserRequest) {
    return this.usersService.addUser(UserRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/details/:userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/all-except-for/:userId')
  getUsers(@Param('userId') userId: number) {
    return this.usersService.getUsers(userId);
  }

  @Get('/all/users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
