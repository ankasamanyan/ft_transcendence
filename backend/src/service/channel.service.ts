import {Injectable} from '@nestjs/common';
import {Users, User} from "../domain/user";

@Injectable()
export class ChannelService {
  createChannel(users: Users) {
   // the first user in the array is the owner and admin
   //the channel is private by default
  }

  setPassword(password: string) {}
  
  assignAdmin(user: User) {}

  leaveChannel() {}

  kickUser(user: User) {}

  muteUser(user: User) {
    //user cannot write messages
  }

  banUser(user: User) {
    //kicked and cannot rejoin
  }

  changeStatus(status: number, password: string = "") {
    //public, private or password-protected
  }
}
