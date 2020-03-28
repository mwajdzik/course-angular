import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import * as moment from 'moment';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import {getActiveExercise, TrainingState} from './training.reducer';
import {SetAvailableTrainings, SetFinishedTrainings, StartTraining, StopTraining} from './training.actions';
import {take} from 'rxjs/operators';

@Injectable()
export class ExerciseService {

  private firebaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private store: Store<TrainingState>,
              private uiService: UIService) {
  }

  fetchAvailableExercises() {
    this.firebaseSubscriptions.push(this.db.collection('ng-fitness_available-exercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(document => {
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data()
          };
        });
      }).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new SetAvailableTrainings(exercises));
      }, error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      }));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('ng-fitness_finished-exercises')
      .add({
        ...exercise,
        date: exercise.date.toISOString()
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubscriptions.push(this.db.collection('ng-fitness_finished-exercises')
      .valueChanges()
      .map(exercises => {
        return exercises.map((exercise: any) => {
          return {
            ...exercise,
            date: moment(exercise.date)
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new SetFinishedTrainings(exercises));
      }, error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(getActiveExercise)
      .pipe(take(1))
      .subscribe(runningExercise => {
        this.addDataToDatabase({...runningExercise, date: moment(), state: 'completed'});
        this.store.dispatch(new StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store.select(getActiveExercise)
      .pipe(take(1))
      .subscribe(runningExercise => {
        const duration = runningExercise.duration * (progress / 100);
        const calories = runningExercise.calories * (progress / 100);
        this.addDataToDatabase({...runningExercise, date: moment(), state: 'cancelled', duration, calories});
        this.store.dispatch(new StopTraining());
      });
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(s => s.unsubscribe());
  }
}
