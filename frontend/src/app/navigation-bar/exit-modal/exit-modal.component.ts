import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies/ng2-cookies";

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.css']
})
export class ExitModalComponent {

  constructor(private router: Router){}

  @Output()
  modalClose = new EventEmitter<void>();

  logout(){
    this.router.navigate(['/authorization']).then()
    localStorage.removeItem('tr_access_token')
    Cookie.delete('id')
  }
}
