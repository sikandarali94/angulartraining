/* We need to import TemplateRef from '@angular/core' before we use it in our Typescript file
 */
/* We need to import ViewContainerRef from '@angular/core' before we use it in our Typescript file
 */
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  /* Here unless is the condition we get. But whenever this condition changes we want to execute
  a method. Here we can implement a setter with the set keyword as shown below. This turns this
  into a method but the important thing is that unless is still a property; it's just a setter
  of the property, which is a method, which gets executed whenever the property changes. So of
  course changes whenever it changes outside of this directive (so whenever the condition we pass
  changes or some parameter of the condition changes).
  So unless will receive a value of the property, which we store in a variable named value as
  shown below (we can name it anything we like). The reason we made value variable a boolean is
  because we know that is the property value type we will be receiving.
   */
  /* If we keep the property name as unless we would get an error because in the template we are
  referring to the property as appUnless and here it was unless. So we have to change the property
  name to appUnless so we don't get the error anymore as shown below.
   */
  @Input() set appUnless(value: boolean) {
    /* unless is the opposite of ngIf so that is why we have !value as a condition.
     */
    if (!value) {
      /* createEmbeddedView() creates a view in the vcRef view container. In this case our
      view is the templateRef.
       */
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      /* clear() clears the view to remove all the elements from the DOM contained in the
      view.
       */
      this.vcRef.clear();
    }
  }
  /* In the end our directive will sit on an ng-template component because that is what
  will get transformed by Angular if we use the star operator (*). So we can get access to
  <ng-template> and we also need to get access to the place in the document where we want to
  render it. Both can be injected as shown below. Please note that TemplateRef is a generic
  type and that is why we have the <any> tag associated with TemplateRef type.
  ViewContainerRef will mark the place where we placed our directive in the document. We can
  see the marking if we inspect the document in the developer tools of our browser.
   */
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
