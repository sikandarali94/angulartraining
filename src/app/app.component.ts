import { Component } from '@angular/core';
import {ServerService} from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
