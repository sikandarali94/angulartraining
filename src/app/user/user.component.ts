import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* For observables provided by Angular, they are automatically unsubscribed from because they are managed by Angular. */
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
