import {Socket, SocketIoConfig} from "ngx-socket-io";
import {Injectable} from "@angular/core";
import { SharedDataService } from "../service/shared-data.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';

const config: SocketIoConfig = {
	url: 'http://localhost:3000', options: {
		autoConnect: true,
		reconnection: true,
		reconnectionDelay: 1,
    	extraHeaders: {
			id: Cookie.get('id')
    }
  }
};

@Injectable({providedIn: 'root'})
export class OurSocket extends Socket {
  constructor(
    private sharedDataService: SharedDataService
  ) {
    super(config);
  }
}