import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  id: number;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

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

  onEdit() {
      /* queryParamsHandling allows us to keep the parameters in the old URL to the new URL. For example, if from
      http://localhost:4200/servers/1?allowEdit=1 we went to http://localhost:4200/servers/1/edit then 'preserve' will
      alter the URL to localhost:4200/servers/1/edit?allowEdit=1 preserving the parameters. There is another option for
      queryParamsHandling which is 'merge'. It simply merges the parameters of the old URL to the parameters of the new
      URL. In this case, since we are not introducing parameters to the new URL, 'preserve' is the better option.
       */
      this.router.navigate(['/servers', this. server.id, 'edit'], {queryParamsHandling: 'preserve'});
  }

}
