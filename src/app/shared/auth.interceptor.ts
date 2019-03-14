/* By default, requests are immutable.
We may retry requests using the retry operator on observables. However, if we retry a request it will actually get sent through and
intercepted by the interceptor many times. The issue is that if the interceptor is modifying a request every time it is retried, at some
point the request will break because of multiple modifications. What we want to do is clone a request before we edit it.
 */
/* To use HttpInterceptor, HttpEvent, HttpHandler and HttpRequest in our TS file, we must first import it from '@angular/common/http'.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

/* Because we want to inject a service into the interceptor, we have to declare the @Injectable() decorator.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  /* The intercept method gets two arguments: the HttpRequest (which is a generic type) and HttpHandler. It returns an observable because
  Angular uses observables to wrap a Http request. The observable will give us back a Http Request (which is a generic type of any because
  it could be any event which is returned).
  HttpHandler is an object which will give us a special method we can execute to let our request continue its journey. If we never call this
  method, the request will never leave our app.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    /* clone() method on the request gives us a fresh copy of the request which we can mutate safely. Within the clone method we can modify
    various parts of the request. In our case, we are modifying the headers using the append() method (we can also use set(), delete() and
    getAll()). By writing req.headers we are getting the value of the header of the original request and then we can use methods on it as
    stated above; similarly, the same goes for params.
     */
    const copiedReq = req.clone({
      // headers: req.headers.append('', '')
      params: req.params.set('auth', this.authService.getToken())
    });

    /* We pass to the HttpHandler's handle method the http request. This will let the request continue its journey. At this point, after
     * we have intercepted the request and made changes to the request, we let the request continue on its journey. If we wrote 'return
     * null' instead, it will block the outgoing http request from leaving the app and to the server. */
    /* Instead of letting the original http request to continue its journey, it makes sense to send the modified copied http request, as
    defined above.
     */
    return next.handle(copiedReq);
  }
}
