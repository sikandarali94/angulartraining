import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
/* The app module is the highest level to inject a service. We have to make sure to import it
and put it in the providers list as we have done below.
 */
import {AccountService} from './account.service';
import {LoggingService} from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  /* To inject a service into another service we cannot do that within our components.
  We have to make sure to import the services into the app module first.
   */
  providers: [AccountService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
