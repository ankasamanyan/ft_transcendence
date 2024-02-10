import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
profilePictureUrl: any;
selectColor(arg0: string) {
throw new Error('Method not implemented.');
}
  settingsForm!: FormGroup;
  selectedColorTheme: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form with default values or values from user data
    this.settingsForm = this.formBuilder.group({
      profilePicture: '',
      name: '',
      surname: ''
    });
  }

  selectColorTheme(theme: string): void {
    this.selectedColorTheme = theme;
  }

  saveSettings(): void {
    // Implement logic to save settings
    console.log(this.settingsForm.value); // You can send this data to your backend or update it locally
    console.log('Selected Color Theme:', this.selectedColorTheme);
  }
}
