import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  template: `
    <h3>Editing...</h3>
    <button class="btn btn-primary" (click)="onSaveChanges()">Save changes</button>
  `,
  styles: []
})
export class EditUserComponent {

  private changesSaved = false;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  private onSaveChanges() {
    // ... saving logic
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
