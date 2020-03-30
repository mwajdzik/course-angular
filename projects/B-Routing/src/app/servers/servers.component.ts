import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-servers',
  template: `
    <h3>Your servers</h3>
    <div style="margin-top: 30px;">
      <button class="btn btn-primary" (click)="onReload()">Reload</button>
    </div>
  `,
  styles: []
})
export class ServersComponent implements OnInit, OnDestroy {

  private queryParamsSubscription: Subscription;
  private fragmentSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onReload() {
    // relative route (no '/servers')
    this.router.navigate(['servers'], {
      relativeTo: this.route.root,
      queryParams: {allowEdit: 0},
      fragment: 'loading'
    });
  }

  ngOnInit() {
    console.log('QUERY PARAMS when component created: ' + JSON.stringify(this.route.snapshot.queryParams));
    console.log('FRAGMENT when component created: ' + this.route.snapshot.fragment);

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams: Params) => {
      console.log('QUERY PARAMS when reloading: ' + JSON.stringify(queryParams));
    });

    this.fragmentSubscription = this.route.fragment.subscribe((fragment: string) => {
      console.log('FRAGMENT when reloading: ' + fragment);
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }
}
