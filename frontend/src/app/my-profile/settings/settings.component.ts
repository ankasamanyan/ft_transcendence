import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    selectColor(arg0: string) {throw new Error('Method not implemented.');}
  @Input() username: any;
  @Input() name: any;
  @Input() profilePicture: any;
  settingsForm: FormGroup = new FormGroup ({});
  selectedColorTheme: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      profilePicture: '../../../assets/placeholderAvatar.jpeg',
      name: '',
      username: ''
    });
  }

    prependAtSign() {
      this.username.patchValue('@$[username]')
    }


  selectColorTheme(theme: string): void {
    this.selectedColorTheme = theme;
  }

  saveSettings(): void {

    console.log(this.settingsForm.value);
    console.log('Selected Color Theme:', this.selectedColorTheme);
  }
}
