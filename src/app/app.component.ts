import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  /* Here, because we moved a section from the app template into a new component
  template, that template requires the methods onAddServer() and onAddBlueprint().
  Therefore we must move the methods from the app model to the component model
  which has the template that requires these methods. We also have to move
  the newServerName and newServerContent properties to the new component model
  as well because the methods that we copied require those properties. The issue
  is both the app component and cockpit component require the serverElements
  array. Without serverElements in both components our app will crash.
   */
}
