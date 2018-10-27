import { Component, OnInit } from '@angular/core';
/* We have to import ActivatedRoute from '@angular/router' before we can use it in our Typescript file.
 */
import {ActivatedRoute, Router} from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  /* ActivatedRoute holds information/meta-data about the current URL
   */
  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /* When we used RouterLink with a relative path it would add the path to the current URL. However, with the navigate method here it
    doesn't add the path to the current URL when we give it a relative path. This is because the navigate() method, unlike RouterLink,
    doesn't know what URL we are currently sitting on. To provide the information of what the current URL is we pass a JS object with the
    key 'relativeTo' and value that holds ActivatedRoute, as shown below. Note that we placed the ActivatedRoute value into the 'route'
    variable in our constructor.
     */
    //this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
