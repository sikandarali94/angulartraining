/* Because we used the @Input decorator in our component below we need to first
import it from '@angular/core'.
 */
/* If we want to access the behaviour of Angular encapsulation we have to first
import ViewEncapsulation from '@angular/core'.
 */
/*
We also have to import our lifecycle hooks from '@angular/core' before we can use
them in our component.
SimpleChanges type needs to be imported before we can use them inside our component
as shown below.
 */
import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    ViewChild,
    ElementRef
} from '@angular/core';

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
/* It is a good practice that we list all the lifecycle hooks we would like to
call after the implements keyword as we have done below.
 */
export class ServerElementComponent implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
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
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  /* ngOnChanges(){} is a lifecycle hook in which the code inside is executed when
  once a bound input property changes (like for example element property in this
  component is bound to @Input(). This lifecycle hook is executed before the
  ngOnInit(){} lifecycle hook. ngOnChanges(){} can be fired multiple times.
  ngOnChanges is the only lifecycle hook that receives an argument called changes
  and is of type SimpleChanges as shown below. The changes variable is an object
  which holds data about the bound properties. In this case we see data about the
  bound element property. This holds data for the bound property like what is the
  CurrentValue of this bound property? Was this the firstChange? And what was the
  previousValue?
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  /* ngOnInit(){} is a lifecycle hook in Angular in which the code inside is
  executed once the component is initialized. Please note that when we say
  initialized we do not mean when then component is rendered in the DOM.
   */
  ngOnInit() {
    console.log('ngOnInit called!');
    /* this.header.nativeElement.textContent will be empty because the
    elements in the component have not been rendered yet.
     */
    console.log('Text Content: ' + this.header.nativeElement.textContent);
  }

  /* ngDoCheck(){} is a lifecycle hook in Angular in which the code inside is
  executed every time during a change detection run. This check is run many
  times because Angular is always looking for changes; so it is a good idea
  to not place heavy duty code inside our ngDoCheck() lifecycle hook.
   */
  ngDoCheck() {
    console.log('ngDoCheck called!');
  }

  /* ngAfterContentInit(){} is a lifecycle hook in Angular in which the code
  inside is run content (ng-content) has been projected into view. So therefore
  the code inside this lifecycle hook is executed only once.
   */
  ngAfterContentInit() {
    console.log('ngAfterContentInit called!');
  }

  /* ngAfterContentChecked(){} is a lifecycle hook in Angular in which the code
  inside is run every time the projected content has been checked.
   */
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!');
  }

  /* ngAfterViewInit(){} is a lifecycle hook in Angular in which the code inside
  is run after the component's view (and child views) has been initialized.
   */
  ngAfterViewInit() {
      /* this.header.nativeElement.textContent will be empty because the
      elements in the component have not been rendered yet.
       */
      /* this.header.nativeElement.textContent will give us a value because
      the elements in the component have been rendered.
       */
      console.log('ngAfterViewInit called!');
      console.log('Text Content: ' + this.header.nativeElement.textContent);
  }

  /* ngAfterViewChecked(){} is a lifecycle hook in Angular in which the code inside
  is run after the view (and child views) have been checked.
   */
  ngAfterViewChecked() {
      console.log('ngAfterViewChecked called!');
  }

  /* ngOnDestroy(){} is a lifecycle hook in Angular in which the code inside
  is run once the component is about to be destroyed.
   */
  ngOnDestroy() {
      console.log('ngOnDestroy called!');
  }
}
