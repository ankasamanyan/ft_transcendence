import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserStatisticsService } from 'src/service/user-statistics.service';
import { UserRequest } from './dto/users-request';
import { JWTAuthGuard } from '../auth/guards/auth.jwt.guard';

@Controller('/user-statistics')
export class UserStatisticsController {
  constructor(private userStatisticsService: UserStatisticsService) {}

  @UseGuards(JWTAuthGuard)
  @Get('/wins/:userId')
  getWins(@Param('userId') userId: number) {
    return this.userStatisticsService.getWins(userId);
  }

  @UseGuards(JWTAuthGuard)
	@Get('/losses/:userId')
	getLosses(@Param('userId') userId: number) {
		return this.userStatisticsService.getLosses(userId);
	}

	@UseGuards(JWTAuthGuard)
	@Get('/stats')
	getUserStatistics(@Body() request: UserRequest) {
		return this.userStatisticsService.getUserStatistics(UserRequest.toDomain(request).id);
	}

	@UseGuards(JWTAuthGuard)
	@Put('/add-win/:userId') 
	addWin(@Param('userId') userId: number) {
		return this.userStatisticsService.addWin(userId);
	}

	@UseGuards(JWTAuthGuard)
	@Put('/add-lose/:userId') 
	addLose(@Param('userId') userId: number) {
		return this.userStatisticsService.addLose(userId);
	}

	@UseGuards(JWTAuthGuard)
	@Post('/:userId')
	initScore(@Param('userId') userId: number) {
		return this.userStatisticsService.initScore(userId);
	}

	@UseGuards(JWTAuthGuard)
	@Get('/ranking')
	getRanking() {
		return this.userStatisticsService.getRanking();
	}
	
	@UseGuards(JWTAuthGuard)
	@Get('/achievements/:userId')
	getAchievements(@Param('userId') userId: number) {
		return this.userStatisticsService.getAchievements(userId);
	}
	

}