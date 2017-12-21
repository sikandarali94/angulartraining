import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* Below we had changed the line from 'servers;' so the variable servers
  can be defined. This change gets rid of the error:
  Cannot read property 'push' of undefined.
   */
  servers = [];

  onAddServer() {
    /* The line of code below is triggering the error:
    Cannot read property 'push' of undefined. Because it is says 'of undefined'
    it means this.servers is triggering the error. Of course if we look above
    we indeed see that servers is undefined because we declared is as simply
    'servers;' and haven't defined it.
     */
    this.servers.push('Another Server');
  }

  onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1);
  }
}
