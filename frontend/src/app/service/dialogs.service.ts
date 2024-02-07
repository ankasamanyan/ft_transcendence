import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Dialogs} from "../domain/dialog";
import {DialogsResponse} from "./dto/dialogs.dto";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private httpClient: HttpClient) { }

  updateDialogs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getDialogs(userId: number): Observable<Dialogs> {
    return this.httpClient.get<DialogsResponse>("http://localhost:3000/dialogs/" + userId).pipe(
      map((dialog: DialogsResponse) => {
        return DialogsResponse.toDomain(dialog);
      }));
  }
}
