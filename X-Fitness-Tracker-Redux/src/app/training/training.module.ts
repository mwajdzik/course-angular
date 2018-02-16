import {NgModule} from '@angular/core';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {TrainingComponent} from './training.component';
import {SharedModule} from '../shared/shared.module';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {TrainingRoutingModule} from './training-routing.module';
import {StoreModule} from '@ngrx/store';
import {trainingReducer} from './training.reducer';

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
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],

  // for components that are NOT created using selectors not routing
  entryComponents: [
    StopTrainingComponent
  ]
})
export class TrainingModule {
}
