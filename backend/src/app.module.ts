import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageHistoryModule } from './message-history/message-history.module';

@Module({
  imports: [MessageHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
