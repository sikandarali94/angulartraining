import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    /* Since the DropdownDirective is in our shared module and we use the DropDownDirective in our header component, that is why we have
    imported it within our core module.
     */
    SharedModule,
    /* Since we have router links in the header, we should import the AppRoutingModule which contains routes for our app.
     */
    AppRoutingModule
  ],
  exports: [
    /* While we need the AppRoutingModule in our core module, we also need it for our app module because we always need our root routes in
    our app module.
     */
    AppRoutingModule,
    /* We are also exporting our header component into the app module because we use the selector 'app-header' within the app component
    template.
    We don't need to export the HomeComponent because for routing we didn't have to export the declarations and we don't use the home
    selector within the app component template.
     */
    HeaderComponent
  ]
})
export class CoreModule {}
