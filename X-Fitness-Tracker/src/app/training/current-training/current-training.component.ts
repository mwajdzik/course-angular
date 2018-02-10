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
    const step = exercise.duration / 100 * 1000;

    this.timer = window.setInterval(() => {
      this.progress += 1;
      if (this.progress > 100) {
        this.progress = 100;
        this.exerciseService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
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
