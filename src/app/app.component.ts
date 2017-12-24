import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* Unlike what we did with the element variable in server-component here we are actually
  assigning a value to serverElements rather than defining its type.
   */
  serverElements = [{type: 'server', name: 'Testserver', content: 'Just a test!'}];

  /* Here, because we moved a section from the app template into a new component
  template, that template requires the methods onAddServer() and onAddBlueprint().
  Therefore we must move the methods from the app model to the component model
  which has the template that requires these methods. We also have to move
  the newServerName and newServerContent properties to the new component model
  as well because the methods that we copied require those properties. The issue
  is both the app component and cockpit component require the serverElements
  array. Without serverElements in both components our app will crash.
   */

  /* These methods would only be executed after the Add Server or Add Server
  Blueprint button has been clicked. So not once the button has been clicked
  but after button has been clicked.
  serverData is type of object we expect to be passed to the onServerAdded()
  method.
   */
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
        type: 'server',
        name: serverData.serverName,
        content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
        type: 'blueprint',
        name: blueprintData.serverName,
        content: blueprintData.serverContent
    });
  }
}
