import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';

const modules = [
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
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {
}
