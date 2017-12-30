import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user',
  template: `
    <h3>User {{user.name}}</h3>
    <hr>
    <div class="btn-group" role="group">
      <a [routerLink]="['/users', getPrevUserId()]" class="btn btn-default">
        <span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
      </a>
      <a [routerLink]="['/users', getNextUserId()]" class="btn btn-default">
        <span class="glyphicon glyphicon-forward" aria-hidden="true"></span>
      </a>
    </div>
  `,
  styles: []
})
export class UserComponent implements OnInit {

  private user;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadUser(this.route.snapshot.params['id']);

    // needed if we reload our component from itself (press" Show next user")
    this.route.params.subscribe(
      (params: Params) => {
        this.loadUser(params['id']);
      }
    );
  }

  loadUser(id: string) {
    this.user = this.usersService.getUserById(parseInt(id, 10));
  }

  getNextUserId() {
    return this.usersService.getNextUserId(this.user.id);
  }

  getPrevUserId() {
    return this.usersService.getPrevUserId(this.user.id);
  }
}
