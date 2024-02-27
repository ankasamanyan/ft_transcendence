import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { TwoFactorCode } from '../domain/two-factor-code';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent {
  twoFactorCodeInput: string | undefined;
  constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private sharedDataService: SharedDataService) {}

      async delay(ms: number) {
          return new Promise( resolve => setTimeout(resolve, ms) );
      }

  submit2FACode() {
    this.authenticationService.submit2FACode(new TwoFactorCode(this.twoFactorCodeInput!)).subscribe(async (data: any) => {
      const token = Cookie.get('accessToken')
      const payload: string = atob(token.split('.')[1])
      const jsonPayload: {name: string, sub: number, is_two_FAed: boolean, iat: number} = JSON.parse(payload);
      Cookie.set('id', jsonPayload.sub.toString())
      this.sharedDataService.setData(jsonPayload.sub);
      this.sharedDataService.setMyUserId(jsonPayload.sub);
      await this.delay(10);
      this.router.navigate(['/chat']);
    });
  }
}