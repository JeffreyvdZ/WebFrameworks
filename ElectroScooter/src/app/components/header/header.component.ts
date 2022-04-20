import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  date = "Today is " + this.getDate();
  subTitle = "Get your bikes on Route 66!";

  constructor() {}

  getDate () {
    let date = new Date();
    return date.toLocaleString('du-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
  ngOnInit(): void {
  }
}
