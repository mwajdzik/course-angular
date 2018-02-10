import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training.component';
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  private intervalTime = 50;
  private realProgress = 0;
  progress = 0;
  timer: number;

  constructor(private exerciseService: ExerciseService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const exercise = this.exerciseService.getRunningExercise();
    const step = this.intervalTime / (10 * exercise.duration);

    this.timer = window.setInterval(() => {
      this.realProgress += step;
      this.progress = Math.round(this.realProgress);

      if (this.realProgress > 100) {
        this.realProgress = 100;
        this.exerciseService.completeExercise();
        clearInterval(this.timer);
      }
    }, this.intervalTime);
  }

  onStop() {
    clearInterval(this.timer);

    const config = {data: {progress: this.progress}};
    const dialogRef = this.dialog.open(StopTrainingComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
