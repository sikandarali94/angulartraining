/* If we are creating custom events we need to import EventEmitter so we can
use it in our component model below.
The @Output decorator needs to imported so we can use it in our components as
shown below.
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  /* To make serverCreated and blueprintCreated custom events we need them to be
  an EventEmitter type as show below.
  EventEmitter is a generic type and thus we use <> sign to indicate that
  EventEmitter is a generic type to Typescript as shown below. Inside we indicate
  the type of event data we are going to emit. In the end we need to place the
  parenthesis at the end of EventEmitter to call the constructor of event emitter
  and create a new event emitter object which is now stored in serverCreated.
  However, we need to make serverCreated listenable from outside this component.
  We don't use the @Input() decorator because we are not getting something passed
  into this component, it's @Output because we are passing something out of the
  component.
   */
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit() {
  }

  /* We want to tell the parent component of cockpit component (the app-component) that a
  new server or a new blueprint was created.
   */
  onAddServer() {
    /* To emit the serverCreated custom event we call the emit() method as shown below.
    Inside the emit object we pass an object where we have a serverName and serverContent
    as we defined them in the custom events above.
     */
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
      this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

}
