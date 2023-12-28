import {Injectable} from '@nestjs/common';

@Injectable()
export class DialogService {
  getDialog(senderId: string, receiverId: string): string {
    return 'Hello World!';
  }
}
