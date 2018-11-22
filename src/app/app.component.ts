import { Component } from '@angular/core';
/* FormGroup must be imported from '@angular/forms' before we can use it in our Typescript file. FormGroup is the forms package and it
contains a lot of classes we will work with. In the template driven approach we already imported NgForm from it. NgForm was this
automatically created wrapper, but it was wrapping up FormGroup in the end. This is because in Angular a form, in the end, is just a
group of controls and this is what FormGroup holds.
 */
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* The reactive approach is using Typescript to create forms programmatically.
   */
  genders = ['male', 'female'];
  /* signupForm will hold our form in the end.
   */
  signupForm: FormGroup;
}
