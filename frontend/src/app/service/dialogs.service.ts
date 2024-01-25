import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Dialogs} from "../domain/dialog";
import {DialogsResponse} from "./dto/dialogs.dto";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private httpClient: HttpClient) { }

  getDialogs(authentificatedUser: string): Observable<Dialogs> {
    return this.httpClient.get<DialogsResponse>("http://localhost:3000/dialogs/" + authentificatedUser).pipe(
      map((dialog: DialogsResponse) => {
        return DialogsResponse.toDomain(dialog);
      }));
  }
}
