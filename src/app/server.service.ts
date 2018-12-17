import {Injectable} from '@angular/core';
/* We need to import Headers from '@angular/http' before we can use it in our Typescript file.
 */
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';

@Injectable()
/* We can utilise HTTP methods provided by Angular anywhere in our app but it is better to utilise it within a service.
 */
export class ServerService {
  constructor (private http: Http) {}
  storeServers(servers: any[]) {
    /* For some backends, there might be a need to send some headers with the request. We can create headers using the Headers object
    constructor Angular gives us, shown below.
     */
    const headers = new Headers({'Content-Type': 'application/json'});
    /* http has methods resembling all kinds of http requests.
    A post request will append data in our Firebase database while a put request will override the data in our Firebase database.
    First argument is the URL where we will send our HTTP request. The second argument is the data we want to send.
    In the background, Angular is using an observable so simply writing the http.post() method will not do anything because the observable
    is wrapping our http request but not sending it yet.
    For the request to be sent we need to subscribe to the http observable, because if no one is listening for this observable then Angular
    has no need to send the request. That is why we return the observable.
     */
    /* We need to append the url with the endpoint data.json and is specific to only Firebase. The .json is important because this simply
    tells Firebase that we are about to work with its database, otherwise, we will get an error (again, this is only specific to Firebase).
     */
    /* To send headers, we pass an object as the third argument in our post request and store the headers data of the headers key, as shown
    below.
     */
    // return this.http.post('https://ng-http-80426.firebaseio.com/data.json', servers, {headers: headers});
    /* With a PUT request we are overriding the existing data on the database (this is the specific behaviour with Firebase and might be
    different with other databases). In terms of syntax in how we we send the request, it is exactly the same as how we would send a POST
    request.
     */
    return this.http.put('https://ng-http-80426.firebaseio.com/data.json', servers, {headers: headers});
  }
  getServers() {
    /* A GET request will return back some data as opposed to sending data to the database. The get method of the http object also returns
    an observable that must be subscribed to in order for the request to be sent. We also have to append the URL with the data.json
    endpoint.
    We don't need to specify the data argument because we are not sending any data to the database, only getting back data.
     */
    /* We are deliberately causing an error by removing .json from data.json and then catching the error.
     */
    return this.http.get('https://ng-http-80426.firebaseio.com/data')
    /* The map() observable operator will simply take the old observable and wrap the data we get back into some transformed data and
      wrap this transformed data into another observable.
       */
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      /* Like we did in map(), we also have to return an observable in our catch() operator.
       */
      .catch(
        (error: Response) => {
          /* The catch() operator will not automatically wrap our data into an observable so we have to create our own. throwError()
          automatically creates an observable for us. So now, we can throw a meaningful error onto the console by typing our own.
           */
          return throwError('Something went wrong');
        }
      );
  }
  /* From a URL we are getting a value that we want to display on our app component template.
  At the end of our Firebase URL, we must put the .json data endpoint for the request to go through successfully.
   */
  getAppName() {
    return this.http.get('https://ng-http-80426.firebaseio.com/data/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}
