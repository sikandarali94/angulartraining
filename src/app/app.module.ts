import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
/* We need to import ReactiveFormsModule from '@angular/forms' before we can use it in our TypeScript file.
 */
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  /* We don't need the FormsModule for reactive approach (it is only required for the template driven approach). Instead we need the
  ReactiveFormsModule, as shown below.
   */
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
