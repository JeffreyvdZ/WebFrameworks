import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { WelcomeComponent } from './components/welcome/welcome.component';
import {HeaderComponent} from "./components/header/header.component";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Overview31Component } from './components/scooters/overview31/overview31.component';
import { Overview32Component } from './components/scooters/overview32/overview32.component';
import { Detail32Component } from './components/scooters/detail32/detail32.component';
import { Overview33Component } from './components/scooters/overview33/overview33.component';
import { Detail33Component } from './components/scooters/detail33/detail33.component';
import {AppRoutingModule} from "./app-routing.module";
import { UnknownRouteComponent } from './components/unknown-route/unknown-route.component';
import { Overview34Component } from './components/scooters/overview34/overview34.component';
import { Detail35Component } from './components/scooters/detail35/detail35.component';
import { Overview35Component } from './components/scooters/overview35/overview35.component';
import {Detail34Component} from "./components/scooters/detail34/detail34.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HeaderSbComponent } from './components/header-sb/header-sb.component';
import { NavBarSbComponent } from './components/nav-bar-sb/nav-bar-sb.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {AuthSbHttpInterceptorService} from "./services/auth-sb-http-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    NavBarComponent,
    Overview31Component,
    Overview32Component,
    Detail32Component,
    Overview33Component,
    Detail33Component,
    UnknownRouteComponent,
    Overview34Component,
    Detail34Component,
    Detail35Component,
    Overview35Component,
    HeaderSbComponent,
    NavBarSbComponent,
    SignInComponent
  ],
  imports: [
    FormsModule, BrowserModule, AppRoutingModule, HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthSbHttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
