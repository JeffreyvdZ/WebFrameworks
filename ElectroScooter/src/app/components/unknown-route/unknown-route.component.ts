import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-unknown-route',
  templateUrl: './unknown-route.component.html',
  styleUrls: ['./unknown-route.component.css']
})
export class UnknownRouteComponent implements OnInit {

  errorMessage: String = "";

  constructor(public route: Router) {
    if(history.state.message == null){
      this.errorMessage = "Unknown error, redirected to " + route.url
    } else {
      this.errorMessage = history.state.message;
    }
  }

  ngOnInit(): void {
  }
}
