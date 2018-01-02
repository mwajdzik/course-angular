import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UsersService} from './users.service';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class UserResolverService implements Resolve<User> {

  constructor(private userService: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const id = +route.params['id'];
    return this.userService.getUserById(id);
  }
}
