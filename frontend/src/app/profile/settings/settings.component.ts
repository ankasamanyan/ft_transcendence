import {
  Component,
  Input,
  OnInit,
  Renderer2,
  ElementRef, ViewChild, AfterViewInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "../../domain/user";
import { UsersService } from "../../service/users.service";
import { HttpClient } from "@angular/common/http";
import { TwoFactorCode } from "../../domain/two-factor-code";
import { AuthenticationService } from "../../service/authentication.service";
import { UploadService } from "src/app/service/upload.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  selectColor(arg0: string) {
    throw new Error("Method not implemented.");
  }
  @Input()
  userFromProfile: User | undefined;

  @ViewChild('name') authenticatedUserName!: ElementRef;

  nameOnInit: string | undefined;

  settingsForm: FormGroup = new FormGroup({});

  selectedColorTheme: string = "";

  qrString: string = "";

  tfaButtonText: string = "";

  fileName = "";

  qrCodeFormGroup: any;

  twoFactorCodeInput: string | undefined;
  
  selectedFile: File | undefined;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private uploadService: UploadService,
    // private cdr: ChangeDetectorRef
  ) {
    // if(!this.userFromProfile.tfa_enabled){
    this.getQRCode();
    // }
  }

  ngAfterViewInit() {
    this.authenticatedUserName.nativeElement.focus();
    this.nameOnInit = this.userFromProfile?.name;
  }


  isNameChanged() {
    return this.nameOnInit != this.userFromProfile?.name;
  }

  channelDetailsChanged() {
    return this.isNameChanged();
  }

  updateUser() {
    this.usersService.updateUser(this.userFromProfile!).subscribe();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && this.userFromProfile) {
      this.fileName = this.selectedFile.name;
      console.log("file selected");
      this.uploadService.uploadProfilePicture(this.selectedFile, this.userFromProfile?.id).subscribe();
    }
  }

  changeColorScheme(
    primaryColor: string,
    secondaryColor: string,
    orangeColor: string,
    backgroundColor: string,
    darkerOrangeColor: string,
    lightBlueLighterColor: string,
    lightBlueDarkerColor: string,
    lightGreyColor: string
  ): void {
    document.documentElement.style.setProperty("--color-orange", orangeColor);
    document.documentElement.style.setProperty(
      "--color-orange-darker",
      darkerOrangeColor
    );
    document.documentElement.style.setProperty(
      "--color-light-blue",
      backgroundColor
    );
    document.documentElement.style.setProperty(
      "--color-light-blue-lighter",
      lightBlueLighterColor
    );
    document.documentElement.style.setProperty(
      "--color-light-blue-darker",
      lightBlueDarkerColor
    );
    document.documentElement.style.setProperty(
      "--color-light-gray",
      lightGreyColor
    );
    document.documentElement.style.setProperty(
      "--color-dark-blue",
      primaryColor
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      secondaryColor
    );

    localStorage.setItem(
      "colorScheme",
      JSON.stringify({
        orangeColor,
        darkerOrangeColor,
        backgroundColor,
        lightBlueLighterColor,
        lightBlueDarkerColor,
        lightGreyColor,
        primaryColor,
        secondaryColor,
      })
    );
  }

  // ngOnChanges(changes: SimpleChanges): void {}

  getQRCode() {
    this.http
      .get<any>(`http://localhost:3000/auth/generateQRCode`)
      .subscribe((response) => {
        this.qrString = response.qrCode;
      });
  }

  ngOnInit(): void {
    const savedColorScheme = localStorage.getItem("colorScheme");
    if (savedColorScheme) {
      const colorScheme = JSON.parse(savedColorScheme);
      this.changeColorScheme(
        colorScheme.primaryColor,
        colorScheme.secondaryColor,
        colorScheme.orangeColor,
        colorScheme.backgroundColor,
        colorScheme.darkerOrangeColor,
        colorScheme.lightBlueLighterColor,
        colorScheme.lightBlueDarkerColor,
        colorScheme.lightGreyColor
      );
    }

    this.settingsForm.patchValue({
      name: this.userFromProfile!.name,
      username: this.userFromProfile!.intraLogin,
    });
  }

  selectColorTheme1(): void {
    this.changeColorScheme(
      "#171e2d",
      "#4d6495",
      "#de3737",
      "#e6eef2",
      "#c92828",
      "#fafcff",
      "#d5e0e6",
      "#eff1f1"
    );
  }

  selectColorTheme2(): void {
    this.changeColorScheme(
      "#ab7499",
      "#5c478f",
      "#5c478f",
      "#f2f0f9",
      "#5c478f",
      "#a89ad6",
      "#a89ad6",
      "#bf8cae"
    );
  }

  selectColorTheme3(): void {
    this.changeColorScheme(
      "#6B8A47",
      "#465069",
      "#465c2c",
      "#ebe7d8",
      "#7F7F7F",
      "#FFF",
      "#F4F4F4",
      "#707567"
    );
  }

  selectColorTheme4(): void {
    this.changeColorScheme(
      "#0d4cde",
      "#53A7D8",
      "#8782c2",
      "#e4e7f7",
      "#292643",
      "#FFF",
      "#e4e7f7",
      "#e4e7f7"
    );
  }

  protected readonly FormGroup = FormGroup;

  submit2FACode() {
    this.authenticationService
      .submit2FACode(new TwoFactorCode(this.twoFactorCodeInput!))
      .subscribe((data: any) => {
        console.log(data);
        this.userFromProfile!.tfa_enabled = true;
        this.qrString = ''
        this.twoFactorCodeInput = ''
      });
  }

  disable2FA() {
    this.authenticationService.disable2FACode()
    .subscribe((data: any) => {
      console.log(data);
      this.userFromProfile!.tfa_enabled = false;
      this.getQRCode()
      console.log(this.userFromProfile!.tfa_enabled);
    });
  }
}
