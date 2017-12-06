import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  /* Either templateUrl has to be present or template. If we use template
  then we write in an inline template. Wrapping is not supported in a
  typescript string so we put
  '<app-server></app-server><app-server></app-server>' all in one line.
  However we can use back ticks (`) to use Javascript template expressions
  and that allows use to write this template on multiple lines.
   */
  template: `
  <app-server></app-server>
  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
