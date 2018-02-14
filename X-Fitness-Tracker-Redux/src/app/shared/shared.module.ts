import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

const importExport = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: importExport,
  exports: importExport,
})
export class SharedModule {
}
