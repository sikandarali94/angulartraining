/* A resolver is like a service like CanActivate and CanDeactivate which will allow us to run some code before a route is rendered. This
is especially helpful if we are getting data from some back-end for example. The difference to CanActivate and CanDeactivate is that the
resolver will not decide whether this route should render or not (whether the component should load or not). The resolver will always render
the component in the end but it will do some pre-loading you could say to fetch some data that the component will need later on.
 */

/* We need to import Resolve from '@angular/router' before we can use it in our TypeScript file.
 */
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';

/* Instead of writing in Resolve, Observable and Promise individually: <{id: number, name: string, status: string}> it is better practice
to define an interface that describes this data structure like we have done below. We can then simply write the type in Resolve, Observable
and Promise as Server as we have done below.
 */
interface Server {
    id: number;
    name: string;
    status: string;
}

/* Since we are injecting the ServersService in this service we have to place the @Injectable() decorator here.
 */
@Injectable()

/* Resolve is a generic type so it should wrap whatever item or data field we will fetch here in the end.
 */
export class ServerResolver implements Resolve<Server> {
    constructor(private  serversService: ServersService) {}

    /* The Resolve interface requires us to implement a resolve() method. This method takes two arguments: the ActivatedRouteSnapshot and
    RouterStateSnapshot. This should return either an observable that resolves to a data structure defined in the Server interface, or
    return a promise that resolves to a data structure defined in the Server interface, or simply return a data structure defined in the
    Server interface.
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        /* We can use the snapshot to get the id of the server because unlike a component this would run every time the same route is
        loaded so we don't need to use an observable here.
         */
        return this.serversService.getServer(+route.params['id']);
    }
}