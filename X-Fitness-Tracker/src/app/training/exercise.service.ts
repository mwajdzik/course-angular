import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class ExerciseService {

  exerciseChange = new Subject<Exercise>();
  availableExercisesChange = new Subject<Exercise[]>();
  finishedExercisesChange = new Subject<Exercise[]>();

  private firebaseSubscriptions: Subscription[] = [];

  private availableExercises: Exercise[] = [
    // {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    // {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    // {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    // {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];

  private runningExercise: Exercise = null;

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    // return this.availableExercises.slice();
    // return this.db.collection('ng-fitness_available-exercises')
    //          .valueChanges();

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
        this.availableExercises = exercises;
        this.availableExercisesChange.next([...exercises]);
      }, error => {
        console.log(error);
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
        this.finishedExercisesChange.next(exercises);
      }, error => {
        console.log(error);
      }));
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: moment(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    const duration = this.runningExercise.duration * (progress / 100);
    const calories = this.runningExercise.calories * (progress / 100);
    this.addDataToDatabase({...this.runningExercise, date: moment(), state: 'cancelled', duration, calories});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(s => s.unsubscribe());
  }
}
