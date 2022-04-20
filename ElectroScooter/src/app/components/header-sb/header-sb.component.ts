import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../services/session-sb.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header-sb',
  templateUrl: './header-sb.component.html',
  styleUrls: ['./header-sb.component.css']
})
export class HeaderSbComponent implements OnInit {
  date = "Today is " + this.getDate();
  subTitle = "Get your bikes on Route 66! Welcome ";
  user: User;

  constructor(public sessionSbService: SessionSbService) {
  }

  getDate () {
    let date = new Date();
    return date.toLocaleString('du-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  getCurrentUserName(): String{
    this.user = this.sessionSbService.getCurrentUser()
    if(this.user != null) return this.user.name;
    return "Visitor";
  }
  ngOnInit(): void {
  }
}
