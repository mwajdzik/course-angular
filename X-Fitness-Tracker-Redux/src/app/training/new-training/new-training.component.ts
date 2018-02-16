import {Component, OnInit} from '@angular/core';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {getAvailableExercises, TrainingState} from '../training.reducer';
import {Store} from '@ngrx/store';
import {StartTraining} from '../training.actions';
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService,
              private store: Store<TrainingState>) {
  }

  ngOnInit() {
    this.exerciseService.fetchAvailableExercises();

    this.store.select(getAvailableExercises)
      .subscribe(exercises => this.exercises = exercises);
  }

  onStart(form: NgForm) {
    this.store.dispatch(new StartTraining(form.value.exercise));
  }
}
