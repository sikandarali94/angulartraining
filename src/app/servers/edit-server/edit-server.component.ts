import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* This is one method below in how we can access query parameter values and fragment values in the current URL. However, this would
    not update the component that is currently loaded which has the data passed in the URL altered.
     */
    //console.log(this.route.snapshot.queryParams);
    //console.log(this.route.snapshot.fragment);
    /* To counter the above issue, route object has queryParams and fragment observables that reload the currently loaded component if
    the data passed to that component from the URL has changed. We don't have to manually unsubscribe to these observables if the component
    is destroyed as Angular would do it automatically for us.
     */
    this.route.queryParams
        .subscribe(
            (queryParams: Params) => {
              this.allowEdit = queryParams['allowEdit'] === '1';
            }
        );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
