import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  /* An interceptor will basically run code before our request leaves our app, so before it really is sent and right before the response is
  forwarded to subscribe (using next). Therefore, with an interceptor, for example, we can attach custom headers to all outgoing requests
  in order to authenticate a user. The req object has all the information about the request, like the URL and so on. */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* The request object is immutable, so we cannot do something like req.url = 'something else'. Therefore, if we want to modify a
    request we have to create a new one using the clone method (in the object passed to the clone method, we overwrite all the core things
    of the request), as shown below. */
    const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });
    console.log('Request is on its way');
    console.log(req.url);
    /* We use next to let the request continue after modifying it. Otherwise, the request will not continue and could break our app that
    is reliant on the request. */
    // After creating the modified request, we then forward the modified request, as shown below.
    return next.handle(modifiedRequest);
  }
}
