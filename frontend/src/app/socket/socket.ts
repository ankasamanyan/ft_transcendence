import {Socket, SocketIoConfig} from "ngx-socket-io";
import {Injectable} from "@angular/core";

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1,
    extraHeaders: {
    // Authorization: getToken()
    }}
}

@Injectable({providedIn: 'root'})
export class OurSocket extends Socket {
  constructor() {
    super(config);
  }
}