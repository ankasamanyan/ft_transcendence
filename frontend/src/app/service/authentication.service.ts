import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TwoFactorCode} from "../domain/two-factor-code";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}
  host =  environment.ip;

  private backendUrl =  `http://${this.host}:3000`;

  submit2FACode(code: TwoFactorCode) {
    return this.httpClient.post<TwoFactorCode>(`${this.backendUrl}/auth/ResultFromQrCode`, code);
  }

  disable2FACode() {
    return this.httpClient.get<any>(`${this.backendUrl}/auth/disable2FA`);
  }

}
