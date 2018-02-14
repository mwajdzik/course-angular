import {NgModule} from '@angular/core';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {TrainingComponent} from './training.component';
import {SharedModule} from '../shared/shared.module';
import {StopTrainingComponent} from './current-training/stop-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
  ],

  // for components that are NOT created using selectors not routing
  entryComponents: [
    StopTrainingComponent
  ]
})
export class TrainingModule {
}
