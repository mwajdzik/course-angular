import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;

  private subscription: Subscription;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.subscription = this.exerciseService.exerciseChange.subscribe((exercise) => {
      this.ongoingTraining = exercise !== null;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import {Subscription} from 'rxjs/Subscription';
