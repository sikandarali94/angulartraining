import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  /* The ActivatedRoute object -- which has a lot of meta-data about the current URL -- will give us access to the parameters passed in
  the URL. In our case it is id and name parameter we are looking for.
   */
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      /* The snapshot object holds the parameters passed into the URL. It stores the parameter under the parameter name we defined in our
      routes in the app.module.ts.
       */
      id: this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    };
  }

}
