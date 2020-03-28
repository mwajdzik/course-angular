import {Injectable} from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class UsersService {

  private users = [
    {id: 1, name: 'Maciek'},
    {id: 2, name: 'Madzia'},
    {id: 3, name: 'Ewa'},
    {id: 4, name: 'Kuba'}
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return _.find(this.users, {id: id});
  }

  getNextUserId(id: number) {
    const index = _.findIndex(this.users, {id: id});
    return index === this.users.length - 1 ? _.first(this.users).id : this.users[index + 1].id;
  }

  getPrevUserId(id: number) {
    const index = _.findIndex(this.users, {id: id});
    return index === 0 ? _.last(this.users).id : this.users[index - 1].id;
  }
}
