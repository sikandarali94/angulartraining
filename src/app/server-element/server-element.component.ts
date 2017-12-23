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
  the @Input decorator and it is like a function so we need to execute and t
  hat is why we write it like: @Input().
   */
  @Input() element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit() {
  }

}
