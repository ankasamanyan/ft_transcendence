import { Injectable } from '@nestjs/common';

@Injectable()
export class DialogService {
  getDialog(): string {
    return 'Hello World!';
  }
}
