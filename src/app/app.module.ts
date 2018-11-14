import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* To handle forms with Angular, we first need to make sure to import FormsModule from '@angular/forms'. By default, in our CLI, FormsModule
is included as part of the imports already for us.
 */
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    /* We need to include FormsModule in our imports to use it in our app.
     */
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
