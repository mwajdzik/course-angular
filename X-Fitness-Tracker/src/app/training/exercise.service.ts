import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';

@Injectable()
export class ExerciseService {

  exerciseChange = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];

  private runningExercise: Exercise = null;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
    this.exercises.push({...this.runningExercise, date: moment(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    const duration = this.runningExercise.duration * (progress / 100);
    const calories = this.runningExercise.calories * (progress / 100);
    this.exercises.push({...this.runningExercise, date: moment(), state: 'cancelled', duration, calories});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }
}
