import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <h3>Welcome to Server Manager</h3>
    <p>Manage your servers and users</p>
    <div style="margin-top: 30px;">
      <button class="btn btn-primary" (click)="onLoadServers()">Load Server</button>
    </div>
  `,
  styles: []
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }
}
