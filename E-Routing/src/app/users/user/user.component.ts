import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  template: `
    <h3>{{user.name}}</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, atque consectetur dolor earum enim eos
      facilis incidunt, inventore iste itaque laboriosam magni placeat quasi rem repudiandae, sit temporibus ullam?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, ex impedit nulla officiis optio placeat
      quod! Aliquam aspernatur cupiditate dolorem eligendi, itaque molestiae nam optio quae sint tempore unde
      veritatis?</p>
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
export class UserComponent implements OnInit, OnDestroy {

  private user;
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadUser(this.route.snapshot.params['id']);

    // needed if we reload our component from itself (press" Show next user")
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.loadUser(params['id']);
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
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
