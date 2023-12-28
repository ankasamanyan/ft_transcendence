import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  protected readonly NavigationBarStatus = NavigationBarStatus;
}
