import { Component } from '@angular/core';
import {NavigationBarStatus} from "../model/NavigationBar";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  protected readonly NavigationBarStatus = NavigationBarStatus;
}
