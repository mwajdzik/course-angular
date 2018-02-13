import {NgModule} from '@angular/core';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {TrainingComponent} from './training.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class TrainingModule {
}
