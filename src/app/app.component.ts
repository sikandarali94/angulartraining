import {Component, OnInit} from '@angular/core';
/* FormGroup must be imported from '@angular/forms' before we can use it in our Typescript file. FormGroup is the forms package and it
contains a lot of classes we will work with. In the template driven approach we already imported NgForm from it. NgForm was this
automatically created wrapper, but it was wrapping up FormGroup in the end. This is because in Angular a form, in the end, is just a
group of controls and this is what FormGroup holds.
 */
/* FormControl must be imported from '@angular/forms' before we can use it in our TypeScript file.
 */
/* Validators must be imported from '@angular/forms' before we can use it in our TypeScript file.
 */
/* FormGroup must be imported from '@angular/forms' before we can use it in our TypeScript file.
 */
/* FormArray must be imported from '@angular/forms' before we can use it in our TypeScript file.
 */
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

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
  /* We are creating a custom validator that does not allow these user names to be accepted as valid.
   */
  forbiddenUsernames = ['Chris', 'Anna'];

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
      /* Instead of placing validators in our HTML code, we define our validators in our Typescript code. All the validators are in the
      Validators object. We don't want to execute the validator method like Validators.required() (required is a static method in the
      Validators object). instead we want to pass a reference to that method. Angular will execute this method whenever it detects that
      the input of this form control has changed.
       */
      /* We use paths when we have form controls that are nested in form groups. To access those form controls we use paths.
       */
      'userData': new FormGroup({
          /* We are assigning the forbiddenNames validator to the 'username' form control.
          We will get an error if we simply wrote this.forbiddenNames because this.forbiddenUsernames in our forbiddenNames method is
          not being called from our class but is being called from within the username form control. That is why we are binding the
          AppComponent class object to the this keyword, as shown below.
           */
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          /* The third argument is where we pass asynchronous validators.
          ng-pending is the class that is put on the form control when it is checking the validation.
           */
          'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      /* Since we want male to be selected by default, that is why we set the initial value to 'male'.
       */
      'gender': new FormControl('male'),
      /* FormArray holds an array of controls. So we pass an array to initialize it, as shown below. We can even write new FormControl()
      items in the array, however, we are leaving it empty in this case because we want to dynamically add form controls to this array
      whenever a user presses a button.
       */
      'hobbies': new FormArray([])
    });
    /* We saw that a form control, when checking for validation, goes either from: ng-valid -> ng-pending -> ng-invalid OR ng-invalid ->
    ng-pending -> ng-valid.
    There is actually a form state we can track in general. On the signupForm, and on each of the controls of this form, we have two
    observables we can listen to: statusChanges and valueChanges. We can use these two hooks to closely observe our form or an individual
    form control and react to it.
     */
    // this.signupForm.valueChanges.subscribe(
    //     /* With every keystroke, the form control and form group value data (stored as a single object) is printed on the console.
    //      */
    //     (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
        /* With each keystroke, we either see the status of the form as: VALID, PENDING or INVALID.
         */
        (status) => console.log(status)
    );
    /* Not only can we listen to the updates on our form, we can also update the form on our own. setValue and patchValue is also available
    in the template driven approach. We use setValue to set the value for the whole form.
     */
    this.signupForm.setValue({
        'userData': {
          'username' : 'Max',
          'email' : 'max@test.com'
        },
        'gender' : 'male',
        'hobbies' : []
    });
    /* We use patchValue to set a value for specific form control/s.
     */
    this.signupForm.patchValue({
        'userData': {
            'username': 'Anna'
        }
    });
  }

  onSubmit() {
    /* Our form is in our TypeScript code so we can access it anywhere in our code. The value keys of the form are the form control names
    we gave to the FormGroup.
     */
    console.log(this.signupForm);
    /* We can also reset the form using the reset() method, as shown below. We can pass an object to reset() to reset to specific values.
    So say for example we want to reset the radio button to a specific value rather than being empty.
     */
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    /* We are explicitly casting here, meaning we are telling TypeScript that the part in the outer parenthesis is a FormArray. This allows
    us to use the array push method, otherwise if we had not explicitly cast here then we would have gotten an error.
     */
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  /* A validator in the end is just a function which gets executed by Angular automatically when it checks the validity of the form control
  and it checks the validity whenever we change the form control. For a validator to work correctly it needs to receive an argument of
  what control it should check (it should be of type FormControl).
  A validator also needs to return something for Angular to be able to handle the return value correctly. This something should be a JS
  object. The object should have any key (written as 's' here) which can be interpreted as a string. {[s: string]: boolean} is TypeScript
  syntax for saying hey we want a key-value pair where the key can be interpreted as a string and value to the key is a boolean
  e.g. {nameIsForbidden: true} nameIsForbidden is interpreted as a string and its value is true.
   */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
        /* This key-value pair is stored as an error on the errors property in the form control property of where this validator is placed
        on. In our case, this key-value pair is stored in the errors property of the username form control property.
         */
        return {'nameIsForbidden': true};
    }
    /* This is important. If validation is successful, we have to pass nothing (by omitting the return statement) or null. We should not
    pass, for example, this: {'nameIsForbidden': false}
     */
    return null;
  }

  /* Sometimes we need to use an asynchronous validator. For example, say we type a username and we have to see if the username is already
  stored on a server. Getting data from the server would not be instant and thus it would be an asynchronous method. That is why this
  method will either return a Promise or an Observable.
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      /* Here we are just simulating an asynchronous response.
       */
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          /* Here we don't return something but use resolve since we are in a Promise.
           */
          resolve({'emailIsForbidden' : true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
