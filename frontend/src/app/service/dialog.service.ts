import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SelectedDialog} from "../domain/selected-dialog";
import {SelectedDialogResponse} from "./dto/selected-dialog.dto";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private httpClient: HttpClient) { }

  getDialog(senderId: number, receiverId: number) {
    return this.httpClient.get<SelectedDialogResponse>("http://localhost:3000/selected-dialog/" + senderId + "/" + receiverId).pipe(
      map((dialog: SelectedDialogResponse) => {
        return SelectedDialogResponse.toDomain(dialog);
      }));
  }
}
