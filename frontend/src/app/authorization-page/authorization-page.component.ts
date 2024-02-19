import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent {

  constructor(
              @Inject(DOCUMENT) private document: Document
              ) {
  }

  handleRedirectTo42Login (){
      if(document){
          // @ts-ignore
          document.getElementById("toapi").classList.add("is-loading")
      }
      window.history.replaceState({}, document.title, "/" + "");

  }









}
