import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];

  private exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exerciseService.fetchAvailableExercises();

    this.exerciseSubscription = this.exerciseService.availableExercisesChange.subscribe((e) => {
      this.exercises = e;
    });
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onStart(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
