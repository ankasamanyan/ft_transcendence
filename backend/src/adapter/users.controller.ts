import {Controller, Get, Param} from '@nestjs/common';
import {of} from "rxjs";
import {UsersResponse} from "./dto/users-response";
import {UsersService} from "../service/users.service";

@Controller('/users/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  getDialogs(@Param('user') userId: string) {
    return of(UsersResponse.fromDomain(this.usersService.getUsers(userId)));
  }
}
