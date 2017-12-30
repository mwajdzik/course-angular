import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-users',
  template: `
    <h3>Your users</h3>

    <div>
      <ul>
        <li *ngFor="let user of users">
          <span>{{user.name}}</span>
          <a [routerLink]="[user.id]">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class UsersComponent implements OnInit {

  private users;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.users = this.usersService.getUsers();
  }
}
