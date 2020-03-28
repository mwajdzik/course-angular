import {Component, OnInit} from '@angular/core';
import {getIsTraining, TrainingState} from './training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;

  constructor(private store: Store<TrainingState>) {
  }

  ngOnInit() {
    this.store.select(getIsTraining)
      .subscribe(ongoingTraining => this.ongoingTraining = ongoingTraining);
  }
}
