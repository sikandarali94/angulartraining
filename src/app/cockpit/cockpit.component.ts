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
  Like with @Input we can assign an alias to the property we placed the decorator
  next to by passing a string alias name as shown below.
   */
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  // newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit() {
  }

  /* We want to tell the parent component of cockpit component (the app-component) that a
  new server or a new blueprint was created.
   */
  /* The type of data passed by our local reference into onAddServer element to nameInput
  variable os of the HTMLInputElement. It is better to be explicit about the type as we
  have done below.
   */
  onAddServer(nameInput: HTMLInputElement) {
    /* We can log the data passed by a local reference into our method. Since we get the
    whole element with all its properties passed we can log the value of an input element
    by accessing the value property as shown below.
     */
    // console.log(nameInput.value);
    /* To emit the serverCreated custom event we call the emit() method as shown below.
    Inside the emit object we pass an object where we have a serverName and serverContent
    as we defined them in the custom events above.
     */
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
      this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

}
