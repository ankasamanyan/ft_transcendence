import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SelectedDialog} from "../domain/SelectedDialog";
import {SelectedDialogResponse} from "./dto/selected-dialog.dto";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private httpClient: HttpClient) { }

  getDialog(senderId: string, receiverId: string): Observable<SelectedDialog> {
    return this.httpClient.get<SelectedDialogResponse>("/selected-dialog/" + senderId + receiverId).pipe(
      map((dialog: SelectedDialogResponse) => {
        return SelectedDialogResponse.toDomain(dialog);
      }));
  }
}
