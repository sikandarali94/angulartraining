/* Because we used the @Input decorator in our component below we need to first
import it from '@angular/core'.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  /* The curly braces after the colon is a Typescript syntax that tells it
  that element is a Javascript object and can only be a Javascript object
  with these properties and methods. Here we are not assigning a value to
  the element variable.
  To allow elements property to be able to be accessed to components outside
  of server-element component we need to add a decorator. Therefore decorators
  are not only available to classes but to properties as well.
  The decorator that we use to expose element variable to other components is
  the @Input decorator and it is like a function so we need to execute and
  that is why we write it like: @Input().
  If we want a property that is exposed to other components to have a
  different name like srvElement we have to define it in the @Input decorator
  as we do below. What we did below is known as assigning an 'alias' to the
  element property. However, no we must bind to srvElement if we want to
  bind to the element property.
  This binding to components is knows as Component Binding. Therefore we can
  do HTML Elements Binding (through binding to native properties and events),
  Directives Binding (through custom properties and events) and finally
  Components Binding (through custom properties and events also).
   */
  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit() {
  }

}
