import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UsersService} from '../users.service';
// import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  template: `
    <h3>{{user.name}}</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, atque consectetur dolor earum enim eos
      facilis incidunt, inventore iste itaque laboriosam magni placeat quasi rem repudiandae, sit temporibus ullam?</p>
    <div>
      <button class="btn btn-primary" (click)="onEdit()" [disabled]="!allowEdit">Edit</button>
    </div>
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

  user;
  allowEdit = false;
  // private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === 'true';

    // needed if we reload our component from itself (press" Show next user")
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === 'true';
    });

    // with Resolver approach:
    this.route.data.subscribe((data: Data) => {
      this.user = data['user'];
    });

    // without Resolver:
    // this.loadUser(this.route.snapshot.params['id']);
    //
    // this.paramsSubscription = this.route.params.subscribe((params: Params) => {
    //   this.loadUser(params['id']);
    // });
  }

  ngOnDestroy() {
    // Angular does it automatically for us
    // this.paramsSubscription.unsubscribe();
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

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
