import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'not allowed') {
      return;
    }

    const newReq = req.clone({
      headers: req.headers
        .append('Auth', 'xyz')
    });

    console.log('Sending a request!');

    return next.handle(newReq).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(`Response arrived with status ${event.status}!`);
        }
      })
    );
  }
}
