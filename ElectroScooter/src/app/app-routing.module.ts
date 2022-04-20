import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {Overview31Component} from "./components/scooters/overview31/overview31.component";
import {Overview32Component} from "./components/scooters/overview32/overview32.component";
import {Overview33Component} from "./components/scooters/overview33/overview33.component";
import {UnknownRouteComponent} from "./components/unknown-route/unknown-route.component";
import {Overview34Component} from "./components/scooters/overview34/overview34.component";
import {Detail35Component} from "./components/scooters/detail35/detail35.component";
import {Detail34Component} from "./components/scooters/detail34/detail34.component";
import {Overview35Component} from "./components/scooters/overview35/overview35.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  // {path: 'scooters/overview34', redirectTo:'/scooters/overview34/-', pathMatch: 'full'},
  {path: 'home', component: WelcomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-out', redirectTo: '/sign-in?signOut=true'},
  {path: 'scooters/overview31', component: Overview31Component},
  {path: 'scooters/overview32', component: Overview32Component},
  {path: 'scooters/overview33', component: Overview33Component},
  {path: 'scooters/overview34', component: Overview34Component,
    children:[
      {path: ':id', component: Detail34Component}
    ]},
  {path: 'scooters/overview35', component: Overview35Component,
    children: [
      {path: ':id', component: Detail35Component}
      ]},
  {path: '**', component: UnknownRouteComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
