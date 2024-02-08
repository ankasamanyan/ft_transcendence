import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "../domain/channel";
import {ChannelRequest} from "./dto/channel-request";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  addChannelInformation(channel: Channel): Observable<void> {
    return this.httpClient.post<void>("http://localhost:3000/channels", ChannelRequest.fromDomain(channel));
  }
}
