import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class ExerciseService {

  exerciseChange = new Subject<Exercise>();
  availableExercisesChange = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [
    // {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    // {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    // {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    // {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];

  private runningExercise: Exercise = null;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    // return this.availableExercises.slice();
    // return this.db.collection('ng-fitness_available-exercises')
    //          .valueChanges();

    return this.db.collection('ng-fitness_available-exercises')
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
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('ng-fitness_finished-exercises')
      .add(exercise);
  }

  getExercises() {
    return [...this.exercises];
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
}
