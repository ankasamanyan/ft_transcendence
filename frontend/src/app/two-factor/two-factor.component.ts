import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { TwoFactorCode } from '../domain/two-factor-code';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent {
  twoFactorCodeInput: string | undefined;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {}


  submit2FACode() {
    this.authenticationService.submit2FACode(new TwoFactorCode(this.twoFactorCodeInput!)).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/chat']);
    });
  }
}
