import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  id: number;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* We get parameter values as string but id below expects a number and so does the argument of the getServer() method. To convert a
    string to a number we simply use the unary operator (+) in front of the string value as shown below.
     */
    this.id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.id && this.id < 4 ? this.id : 1);
    this.route.params
        .subscribe(
            (params: Params) => {
              this.server = this.serversService.getServer(+params['id'] && +params['id'] < 4 ? +params['id'] : 1);
            }
        )
  }

}
