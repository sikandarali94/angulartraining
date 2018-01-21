/* To create a directive automatically we can use the CLI with the command:
ng g d directive-name. We can also write ng generate directive directive-name.
 */
/* Renderer2 needs to be imported from '@angular/core' before it can be used in our
Typescript file.
 */
/* HostListener needs to be imported from '@angular/core' before it can be used in our
Typescript file.
 */
/* HostBinding needs to be imported from '@angular/core' before it can be used in our
Typescript file.
 */
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  /* @HostBinding decorator allows us to not use the Renderer. There is nothing wrong with using
  the renderer, but we get an even easier way of simply changing the background color if that is
  all we want to do in a directive.
  In Host Binding we can define to which property of the hosting element we want to bind. Just
  like we wrote nativeElement.style.backgroundColor we write as a string 'style.backgroundColor'
  in Host Binding.
  With the code below we are telling Angular is please access the style property and set the
  value of backgroundColor style property to whatever the value of backgroundColor variable is.
  We also have to set the backgroundColor to an initial value so we don't get an error.
  With HostBinding we can bind to any property our directive sits on.
  */
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  /* Renderer2 is the better alternative to modifying our DOM elements from our model
  code. We must specify the Renderer2 type for the variable. We still need to get a
  reference to an element using the ElementRef type.
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    /* With a rendered we get a couple of helper methods like setStyle() or setProperty()
    to work with the DOM. setStyle() helper method allows us to set the style of an element
    as shown below. For setStyle() we need to first reference the element we are setting
    the style for and thus we need an ElementRef variable that references that element that
    the directive is sitting on. In the next argument we select the style property of the
    element. The third argument is the style property value that we want to set. The fourth
    argument and final argument is flag object. In the flag object we set a couple of flags
    for the style and it is optional. We can for example set the !important flag to override
    other styles, and things like that.
     */
    /* The reason this is a better approach is Angular in not limited to running just in the
    browser. Angular also works with service workers: these are environments where we might
    not have access to the DOM. So if we try to change the DOM by directly access the native
    element and setting the style of this element directly, we might get an error in some
    circumstances. In fairness, in most circumstances we don't get an error because we will
    know if Angular is going to run in the browser or not but still this is a better practice
    to use the Renderer for DOM access and to use the methods the Renderer provides to access
    the DOM.
     */
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }
  /* HostListener allows us to listen to events on the DOM element that the directive sits on
  and execute a method. In this case the method is mouseover(). Inside @HostListener() we specify
  the event that occurs which then executes the method as a string argument. In this case the
  event is mouseenter, which is one of the events supported by the DOM element this directive
  sits on. So basically we have all the events available we could also use with event binding
  before.
  In the executed method we could also receive the event data like this:
  @HostListener('mouseenter') mouseover(eventData: Event) {}
  We can also listen to custom events here and retrieve the data.
   */
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    /* We then simply change the value of variable backgroundColor and this affects the
    background-color of the element the directive sits on.
     */
    this.backgroundColor = 'blue';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }
}
