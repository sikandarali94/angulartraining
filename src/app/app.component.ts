import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipeState =  true;
  gatherState(event) {
    this.recipeState = event.recipeState;
  }
}
