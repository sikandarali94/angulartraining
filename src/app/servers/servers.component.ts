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
    this.serverCreationStatus = 'Server was created!';
  }

}
