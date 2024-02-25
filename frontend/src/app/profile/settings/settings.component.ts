import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../../domain/user";
import {UsersService} from "../../service/users.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    selectColor(arg0: string) {throw new Error('Method not implemented.');}
  @Input() username!: string;
  @Input() name!: string;
  @Input() profilePicture: any;
  @Input() is_2fa_enabled!: boolean | undefined;
  @Input() userFromProfile!: User;
  settingsForm: FormGroup = new FormGroup ({});
  selectedColorTheme: string = '';

  qrString: string = ''

  tfaButtonText: string  = '';

  qrCodeFormGroup: any;

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              private usersService: UsersService,
              private http: HttpClient) {
    // if(!this.userFromProfile.tfa_enabled){
      this.getQRCode();
    // }
  }

  changeColorScheme ( 
    primaryColor: string, 
    secondaryColor: string, 
    orangeColor: string,
    backgroundColor: string,
    darkerOrangeColor: string,
    lightBlueLighterColor: string,
    lightBlueDarkerColor: string,
    lightGreyColor:string ): void {

    this.renderer.setStyle(document.body, '--color-orange', orangeColor);
    this.renderer.setStyle(document.body, '--color-orange-darker', darkerOrangeColor);
    this.renderer.setStyle(document.body, '--color-light-blue', backgroundColor);
    this.renderer.setStyle(document.body, '--color-light-blue-lighter', lightBlueLighterColor);
    this.renderer.setStyle(document.body, '--color-light-blue-darker', lightBlueDarkerColor);
    this.renderer.setStyle(document.body, '--color-light-gray', lightGreyColor);
    this.renderer.setStyle(document.body, '--color-dark-blue', primaryColor);
    this.renderer.setStyle(document.body, '--color-secondary', secondaryColor);

    localStorage.setItem('colorScheme', JSON.stringify({ orangeColor, darkerOrangeColor, backgroundColor, lightBlueLighterColor, lightBlueDarkerColor, lightGreyColor, primaryColor, secondaryColor}));

  }

  updateStatus2FA(){
    const user = this.userFromProfile
    // this.usersService.updateUser(e)
  }

  getQRCode(){
    this.http.get<any>("http://localhost:3000/auth/generateQRCode").subscribe(response =>{
          this.qrString = response.qrCode;
        }
    )
  }


  ngOnInit(): void {

    this.settingsForm.patchValue({
      name: this.name,
      username: this.username
    });
  }



  selectColorTheme1(): void {
  document.documentElement.style.setProperty(`${'primaryColor'}`, '#fce4ec' + '');

    this.changeColorScheme(
      '#171e2d', // Dark Blue
      '#4d6495', // Secondary Blue
      '#de3737', // Orange
      '#e6eef2', // Light Blue
      '#c92828', // Darker Orange
      '#fafcff', // Lighter Light Blue
      '#d5e0e6', // Darker Light Blue
      '#eff1f1'  // Light Gray
    );
  }

  selectColorTheme2(): void {
    this.changeColorScheme(
      '#8a4f7d', // Dark Purple
      '#ff8c00', // Dark Orange
      '#f0f5f9', // Light Grayish Blue
      '#fce4ec', // Light Pink
      '#754063', // Darker Purple
      '#fffaf0', // Ivory
      '#bcd4e6', // Lighter Grayish Blue
      '#4b5320'  // Dark Olive Green
    );
  }

  selectColorTheme3(): void {
    this.changeColorScheme(
      '#2a9d8f', // Teal
      '#e76f51', // Rust
      '#f0f5f9', // Light Grayish Blue
      '#fce4ec', // Light Pink
      '#264653', // Dark Teal
      '#fffaf0', // Ivory
      '#bcd4e6', // Lighter Grayish Blue
      '#005a32'  // Dark Green
    );
  }

  selectColorTheme4(): void {
    this.changeColorScheme(
      '#2c3e50', // Dark Blue Gray
      '#e74c3c', // Alizarin Crimson
      '#ecf0f1', // Light Clouds
      '#d4e6f1', // Light Blue Gray
      '#34495e', // Midnight Blue
      '#ecf0f1', // Light Clouds
      '#bdc3c7', // Silver
      '#7f8c8d'  // Grayish Blue
    );    
  }

  saveSettings(): void {

    // console.log(this.settingsForm.value);
    // console.log('Selected Color Theme:', this.selectedColorTheme);
  }

  handleCodeSubmit() {
    // console.log("this.qrCodeFormGroup = ", this.qrCodeFormGroup)
    this.http.post<any>("http://localhost:3000/auth/ResultFromQrCode", {two_FA_code: (this.qrCodeFormGroup)}).subscribe(response => {
      // console.log("response = ", response)
    })
  }

  protected readonly FormGroup = FormGroup;
}
