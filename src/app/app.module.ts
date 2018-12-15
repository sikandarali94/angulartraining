import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
/* To implement a pipe in or module we first need to import it in our module.
 */
import {ShortenPipe} from './shorten.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  /* To use a pipe we need to add it to our declarations.
   */
  declarations: [
    AppComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
