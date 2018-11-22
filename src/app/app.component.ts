import {Component, OnInit} from '@angular/core';
/* FormGroup must be imported from '@angular/forms' before we can use it in our Typescript file. FormGroup is the forms package and it
contains a lot of classes we will work with. In the template driven approach we already imported NgForm from it. NgForm was this
automatically created wrapper, but it was wrapping up FormGroup in the end. This is because in Angular a form, in the end, is just a
group of controls and this is what FormGroup holds.
 */
/* FormControl must be imported from '@angular/forms' before we can use it in our TypeScript file.
 */
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /* The reactive approach is using Typescript to create forms programmatically.
   */
  genders = ['male', 'female'];
  /* signupForm will hold our form in the end.
   */
  signupForm: FormGroup;

  ngOnInit() {
    /* We should initialize our form before rendering the template. That is why we are creating the form inside the ngOnInit lifecycle
    hook.
     */
    /* Form controls are just key-value pairs inside the object that is passed to FormGroup, as shown below.
     */
    this.signupForm = new FormGroup({
      /* The reason we are placing single quotes around username is because during minification, the property name username is kept,
      because we will reference it in our HTML code. 'username' is a form control, hence why we construct it using new FormControl().
      The first argument FormControl takes is the initial state/value of the form control. The second argument will be a single validator
      or an array of validators we want to apply to this control. The third argument will be potential asynchronous validators.
       */
      'username': new FormControl(null, ),
      'email': new FormControl(null),
      /* Since we want male to be selected by default, that is why we set the initial value to 'male'.
       */
      'gender': new FormControl('male')
    });
  }
}
