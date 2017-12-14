import { Component, OnInit } from '@angular/core';

@Component({
  /* We are not limited to using an element selector by just the name.
  We can for example write: selector: '[app-servers]'. This allows us
  to use select those elements with the attribute of app-servers.
   */
  // selector: '[app-servers]',
  /* If we want to choose selectors by class name we can write:
  selector: '.app-servers'. An important thing to note is that
  we cannot select an element by id here or
  pseudo-classes(e.g. :hover).
  Typically we just use the standard element selector like:
  selector: 'app-servers'
   */
  // selector: '.app-servers',
  selector: 'app-servers',
  /* Either templateUrl has to be present or template. If we use template
  then we write in an inline template. Wrapping is not supported in a
  typescript string so we put
  '<app-server></app-server><app-server></app-server>' all in one line.
  However we can use back ticks (`) to use Javascript template expressions
  and that allows use to write this template on multiple lines.
   */
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  /* serverName having the value of 'Testserver' will not be placed into
  the template when the app is run if we are not using two-way binding.
   */
  serverName = 'Testserver';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    /* The arrow function (=>) is ES6 syntax.
     */
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  /* 'any' tells Typescript that the variable can be any data type.
  The correct data type to tell Typescript in this case would be Event.
  This tells Typescript that the variable is an event variable.
  (<HTMLInputElement>event.target) informs Typescript that we know
  that the type of the HTML element of this event will be an HTML
  input element. This is doing explicit casting.
  For an input element the event variable has stored the value of
  the input text box in the target variable stored in the event
  variable. We can check what information is stored in the event
  variable by doing: console.log(event).
   */
  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
