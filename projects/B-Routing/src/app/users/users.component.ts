import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-users',
  template: `
    <div style="margin-top: 10px;">
      <div class="col-xs-3">
        <h3 style="margin-bottom: 20px;">Your users:</h3>

        <ul class="list-group">
          <li *ngFor="let user of users" class="list-group-item">
            <span>{{user.name}}</span>
            <a [routerLink]="[user.id]" [queryParams]="{allowEdit: user.id % 2 == 0}" fragment="loading">
              <span class="glyphicon glyphicon-edit" aria-hidden="true" style="padding-left: 5px;"></span>
            </a>
          </li>
        </ul>
      </div>

      <div class="col-xs-8 col-xs-offset-1">
        <router-outlet>
        </router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class UsersComponent implements OnInit {

  users;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.users = this.usersService.getUsers();
  }
}
