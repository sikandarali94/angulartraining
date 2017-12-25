/* Because we used the @Input decorator in our component below we need to first
import it from '@angular/core'.
 */
/* If we want to access the behaviour of Angular encapsulation we have to first
import ViewEncapsulation from '@angular/core'.
 */
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  /* If we want to override View Encapsulation of Angular we have to add
  encapsulation to the @Component decorator below. We can then access
  ViewEncapsulation and we can choose between three modes:
  Emulated, None or Native
  Emulated is the default mode.
  If we want to stop the behaviour of View Encapsulation we choose the
  None mode as we did below. Then in the browser we don't see the strange
  attributes within those elements of this component. So any styles defined
  in this component will be added globally.
  In most cases we would like View Encapsulation to be on but it is important
  to know that we can stop View Encapsulation for a component if we like.
  The Native mode uses shadow DOM technology but then this won't work in
  older browsers even though it gives us the same result.
   */
  encapsulation: ViewEncapsulation.None
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
