import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ExerciseService} from '../training/exercise.service';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import {State} from '../app.reducer';
import {StartLoading, StopLoading} from '../shared/ui.actions';

@Injectable()
export class AuthService {

  private isAuthenticated = false;

  authChange = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UIService,
              private store: Store<State>,
              private exerciseService: ExerciseService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log('REGISTERED:', result);
        this.store.dispatch(new StopLoading());
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
        this.store.dispatch(new StopLoading());
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log('LOGGED IN:', result);
        this.store.dispatch(new StopLoading());
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
        this.store.dispatch(new StopLoading());
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
