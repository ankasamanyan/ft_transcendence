import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TwoFactorCode} from "../domain/two-factor-code";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  submit2FACode(code: TwoFactorCode) {
    return this.httpClient.post<TwoFactorCode>("http://localhost:3000/auth/ResultFromQrCode", code);
  }
}
