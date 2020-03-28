import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
      <p>You already got {{progress}}%</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `,
  styles: [``]
})
export class StopTrainingComponent {

  progress: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.progress = data.progress;
  }
}
