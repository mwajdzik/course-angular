import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {getIsAuthenticated, State} from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth = false;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(getIsAuthenticated)
      .subscribe((status) => this.isAuth = status);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
