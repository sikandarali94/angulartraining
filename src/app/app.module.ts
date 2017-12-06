/* Modules bundle our components into packages.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
/* When we register a component we have to tell Angular where the component exists.
So we need to use the import statement to tell Angular where the ServerComponent lies.
We emit the .ts extension in the URL. The extension is added by Webpack which bundles our
component automatically.
 */
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  /* By default Angular will not scan our files for different components.
  We have to register our components in the module. So we have to tell Angular
  that the ServerComponent exists. We register our components in the declarations
  attribute.
   */
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
