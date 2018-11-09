import { Component, OnInit } from '@angular/core';
/* We need to import Data from '@angular/router' before we can use it in our TypeScript file.
 */
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  /* We are trying to output a message to this component which we haven't gotten here.
   */
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /* We can access the static data defined in our routes in the snapshot object.
     */
    this.errorMessage = this.route.snapshot.data['message'];
    /* Like with query parameters if the data could possibly change when we are on the route we can assign an observable to it to monitor
    for changes.
     */
    this.route.data.subscribe(
        (data: Data) => {
          this.errorMessage = data['message'];
        }
    );
  }

}
