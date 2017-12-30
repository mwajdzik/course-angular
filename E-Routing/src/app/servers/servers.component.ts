import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
export class ServersComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onReload() {
    // relative route (no '/servers')
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
