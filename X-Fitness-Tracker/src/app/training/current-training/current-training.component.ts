import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter<void>();

  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = window.setInterval(() => {
      this.progress += 1;
      if (this.progress > 100) {
        clearInterval(this.timer);
        this.progress = 100;
      }
    }, 50);
  }

  onStop() {
    clearInterval(this.timer);

    const config = {data: {progress: this.progress}};
    const dialogRef = this.dialog.open(StopTrainingComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
