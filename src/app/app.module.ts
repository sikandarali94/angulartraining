import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
/* We have to import the HttpClientModule to send HTTP requests with Angular, as shown below.*/
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  /* Make sure to add HttpClientModule to the imports array, as shown below. */
  imports: [BrowserModule, FormsModule, HttpClientModule],
  /* HTTP_INTERCEPTORS is actually a token by which this injection can later be identified by Angular, so it will basically know that all
  the classes we provide on that token, so by using that identifier, should be treated as HTTP interceptors and should therefore run their
  intercept method whenever a request leaves the application. We can have multiple interceptors, by setting multi: true, as shown below */
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
