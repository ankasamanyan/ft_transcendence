import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersRequest } from './dto/users-request';
import { BlockedUsersService } from '../service/blocked-users.service';
import { JWTAuthGuard } from 'src/auth/guards/auth.jwt.guard';
// import { FTAuthGuard } from 'src/auth/guards/auth.42.guard';


@Controller('/blocked-users')
export class BlockedUsersController {
  constructor(private blockedUsersService: BlockedUsersService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  blockUser(@Body() request: UsersRequest) {
    return this.blockedUsersService.blockUser(UsersRequest.toDomain(request));
  }

  @UseGuards(JWTAuthGuard)
  @Delete('unblock-user/:blockerId/:blockedId')
  unblockUser(@Param('blockerId') blockerId: number, @Param('blockedId') blockedId: number) {
    return this.blockedUsersService.unblockUser(blockerId, blockedId);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/:userId')
  getBlockedUsers(@Param('userId') userId: number) {
    return this.blockedUsersService.getBlockedUsers(userId);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/is-blocked/:blockerId/:blockedId')
  isBlocked(@Param('blockerId') blockerId: number, @Param('blockedId') blockedId: number) {
    return this.blockedUsersService.isBlocked(blockerId, blockedId);
  }
}
