import { Component } from '@angular/core';
import {ServerService} from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* We are calling the method and storing the returned observable into appName.
   */
  appName = this.serverService.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  constructor (private serverService: ServerService) {}
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave() {
    /* This is where we are subscribing to the http observable. We don't need to unsubscribe from this observable because since it will
    only get one response anyways, Angular will clear it for us.
     */
    this.serverService.storeServers(this.servers)
      /* The first argument is a function that receives the response from the server as an argument. The second argument is a function
      that runs if an error has returned from the server and receives the error from the server as an argument.
       */
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onGet() {
    this.serverService.getServers()
    /* From Firebase, we get a json response and so we have to unwrap the json into a JS object. The response is also of type Response and
    it has a json method which unwraps the json response data to a JS object, as shown below.
       */
      .subscribe(
        /* After transforming the data with the map operator we know that after transforming json to a JS object, that we will get back
        an array.
         */
        /* We are transforming the data by prefixing the server names with 'FETCHED_' that we are getting from the database. Then we are
        updating it in our component.
         */
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
