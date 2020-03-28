import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {getIsAuthenticated, State} from '../app.reducer';
import {take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private store: Store<State>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canProceed();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.canProceed();
  }

  private canProceed(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getIsAuthenticated)
      .map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }

        return isAuth;
      })
      .pipe(take(1));
  }
}
