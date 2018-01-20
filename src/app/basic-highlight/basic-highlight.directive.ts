/* When creating a directive file we should create the file name ending with .directive.ts.
 */
/* We must import Directive from '@angular/core' before we use it in out Typescript file
in order to create a directive.
We must also import ElementRef from '@angular/core' before we use it in out Typescript file.
We must also import OnInit from '@angular/core' before we use it in out Typescript file.
 */
import {Directive, ElementRef, OnInit} from '@angular/core';
/* Like we created a component with the @Component decorator, to create a directive we use
the @Directive decorator. We pass an object to the @Directive decorator as show below.
We also need to define a selector for the directive and it should be written in camel case
as shown below. Without the square brackets the selector would be an element. To have the
selector as an attribute style we add square brackets ([]) as shown below. This would be
recognised as whenever we add appBasicHighlight without square brackets to an element.
 */
@Directive({
    selector: '[appBasicHighlight]'
})
/* With this directive we want to for example change the background color of the element
that this directive is attached to. To do this we need to get access to the element the
directive sits on. Angular gives us this access. We can 'inject' the element the directive
sits on into this directive. Injection is basically an easy way to get access to some other
classes without having them to instantiate on our own.
Directives has the OnInit lifecycle hook but doesn't have the other lifecycle hooks except
for OnDestroy. This is because, unlike a component, a directive does not have a view.
 */
export class BasicHighlightDirective implements OnInit {
    /* We use the constructor function as shown below to have the element injected because
    we want access to the element whenever the directive is instantiated. What we mean by
    injecting the element is that Angular gives the reference to the element in our directive.
    We have to define the type of the variable where the element reference is stored as
    ElementRef as shown below. To be able to use this data everywhere in our class we can use
    a Typescript shortcut called private as shown below. private makes this both a property of
    this class (in our case it is property elementRef) and automatically assigns this value (in
    our case the value is the instance we're getting to this property).
     */
    constructor(private elementRef: ElementRef) {}
    /* It is better to use the private elementRef in our ngOnInit lifecycle hook rather than in
    our constructor. The reason we are able to access elementRef in our ngOnInit lifecycle hook
    is because of the private shortcut.
     */
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}
