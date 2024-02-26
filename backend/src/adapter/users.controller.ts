import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {UserRequest} from "./dto/users-request";

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
  // @UseGuards(JWTAuthGuard)
  @Get('/all/users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/getStatus/:userId')
  getStatus(@Param('userId') userId: number) {
    if (Number.isNaN(Number(userId))) {
      return {status: "UnknownUser"}
    }
    return this.usersService.getStatus(Number(userId));
  }

  @Get('unique-name/:name')
  isUniqueName(@Param('name') name: string) {
    return this.usersService.isUniqueName(name);
  }

  @Put('/update')
  updateUser(@Body() request: UserRequest) {
    return this.usersService.updateUser(UserRequest.toDomain(request));
  }
}
