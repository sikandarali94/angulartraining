import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
  /* Here we are intercepting the response but the method is the same as intercepting a request.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Here we are passing the request because we don't want to do anything with that; we want to intercept the response. We don't want
    to use the subscribe() method because we will be consuming the response. Instead we use the tap() operator to log the event, which
    doesn't consume the response like the subscribe() method, but we just have an in-between step with the tap() operator.
     */
    return next.handle(req).pipe(tap(
      /* Because we are observing on any event, this will log on send event as well as the event when we receive the response from the
      server.
       */
      event => {
        console.log('Logging interceptor', event);
      }
    ));
  }
}

