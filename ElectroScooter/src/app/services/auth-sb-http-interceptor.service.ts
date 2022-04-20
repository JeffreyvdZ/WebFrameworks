import {Injectable} from '@angular/core';
import {SessionSbService} from "./session-sb.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthSbHttpInterceptorService implements HttpInterceptor {

  constructor(private sessionSbService: SessionSbService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.sessionSbService.getCurrentToken();
    if (token != null) {
      req = AuthSbHttpInterceptorService.addToken(req, token)
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(["/sign-out"]);
          } else if (error.status != 406) {
            let errorMessage = `Request-url = ${error.url}`
              + `<br>Response status code = ${error.status}`
              + `<br>Error message = ${error.message}`
            this.router.navigate(['/error'], {state: {message: errorMessage}});
          }
        }))
  }
  private static addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
