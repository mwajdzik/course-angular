import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ExerciseService} from '../training/exercise.service';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import {State} from '../app.reducer';
import {StartLoading, StopLoading} from '../shared/ui.actions';
import {SetAuthenticated, SetUnauthenticated} from './auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UIService,
              private store: Store<State>,
              private exerciseService: ExerciseService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new SetUnauthenticated());
        this.exerciseService.cancelSubscriptions();
        this.router.navigate(['/login']);
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
}
