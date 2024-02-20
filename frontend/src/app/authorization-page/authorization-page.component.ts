import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {UsersService} from "../service/users.service";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent
{

    // ngOnInit() {
    //     this.usersService.getUsers(5).subscribe( response => {
    //         console.log("users = ", response)
    //     })
    // }

    constructor(
        // private usersService: UsersService,
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
