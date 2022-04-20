import {Component, OnInit} from '@angular/core';
import {SessionSbService} from "../../services/session-sb.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: String;
  password: String;
  token: String;
  errorMessage: String = "";

  constructor(private sessionSbService: SessionSbService, private route: ActivatedRoute, private router: Router) {
    this.token = this.sessionSbService.getCurrentToken();
    this.checkLogOut()
  }

  ngOnInit(): void {
  }

  signIn() {
    this.sessionSbService.asyncSignIn(this.email, this.password).then((data) => {
      if(data === undefined){
        this.errorMessage = "Could not authenticate with provided credentials"
        return
      }
      this.token = this.sessionSbService.getCurrentToken();
      this.router.navigate(['/home'])
    });
  }

  checkLogOut() {
    this.route.queryParams.subscribe(params => {
      if (params.signOut === "true") {
        this.sessionSbService.signOut();
        this.token = this.sessionSbService.getCurrentToken();
      }
    })
  }
}
