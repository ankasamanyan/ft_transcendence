import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../domain/message";
import {MessageRequest} from "./dto/selected-dialog.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  saveMessage(message: Message): Observable<void> {
    return this.httpClient.post<void>(
      "http://localhost:3000/messages",
      MessageRequest.fromDomain(message));
  }
}
