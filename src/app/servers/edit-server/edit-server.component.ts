import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ServersService } from '../servers.service';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
/* We are implementing the CanComponentDeactivate interface with this component/class.
 */
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  /* We want to implement an action if a user is leaving a route we want to ask if he or she would really like to leave the route due to
  unsaved changes for example.
   */
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

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
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.route.params
        .subscribe(
            (params: Params) => {
              this.server = this.serversService.getServer(+params['id']);
            }
        );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    /* After changes have been saved to editing a server, we want to navigate up one level to the last loaded server.
     */
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /* The CanComponentDeactivate interface is implemented on this component/class and thus we are required to have a canDeactivate() method
  here that returns either an observable that resolves to boolean, or return a promise that resolves to a boolean, or simply return a
  boolean. This method is the one that will run whenever we try to leave this component.
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    /* If we are not allowed to edit the server then of course we can leave the component.
     */
    if (!this.allowEdit) {
     return true;
    }

    /* If the server name or server status has been changed and the changes were not saved.
     */
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
        /* If not, show a confirm box that returns either true or false. If user wants to discard the changes then allow him to leave, and
        if not, then don't allow him to leave.
        */
        return confirm('Do you want to discard the changes?');
    } else {
        // Otherwise allow the user to leave.
        return true;
    }
  }

}
