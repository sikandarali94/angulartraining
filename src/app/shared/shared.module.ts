/* Typically, we have one shared module in each application but we could have multiple ones. In the latter case we could name the shared
modules in terms of what features are being shared. Regardless, we typically have only one shared module.
 */
import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';

/* A shared module is like a normal module in terms of using NgModule and so forth to declare it. It just differs in terms of how we use
a shared module compared to the root module or feature modules.
 */
@NgModule({
  /* In a shared module, we place in the declarations those modules, directives, pipes and so forth that we want shared.
   */
  declarations: [
    DropdownDirective
  ],
  /* Thus far we have only used exports to export configured routing modules. However, here, we will use it to export the DropdownDirective,
  as shown below. This is because anything declared within a module is only available within that module; to make something within the
  module available to other modules, we export it explicitally. Therefore, it is a good idea to export the CommonModule to other modules
  so we don't have to keep declaring it separately in the other modules. Notice that we did not put CommonModule in imports before exporting
  them. This is because we don't need to import modules to be able to export them.
   */
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {}
