import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ]
})
export class MaterialModule {
}
