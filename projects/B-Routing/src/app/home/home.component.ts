import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  template: `
    <h3>Welcome to Server Manager</h3>
    <p>Manage your servers and users</p>
    <div style="margin-top: 30px;">
      <button class="btn btn-primary" (click)="onLoadServers()">Load Server</button>
      <button class="btn btn-default" (click)="onLogin()">Login</button>
      <button class="btn btn-default" (click)="onLogout()">Logout</button>
    </div>
  `,
  styles: [`
    .btn {
      margin-right: 0.5em;
    }
  `]
})
export class HomeComponent {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
