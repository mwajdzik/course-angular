import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  template: `
    <div class="col-xs-6">
      <label>Item Name
        <input type="text" class="form-control" [(ngModel)]="newName" #localRef1>
      </label>
      <label>Content
        <input type="text" class="form-control" [(ngModel)]="newContent" #localRef2>
      </label>
    </div>
    <div class="col-xs-6">
      <button class="btn btn-primary" (click)="onAddItem()">Add</button>
      <button class="btn btn-primary" (click)="onAddItemWithRefs(localRef1, localRef2)">
        Add with local refs
      </button>
      <button class="btn btn-primary" (click)="onAddItemWithViewChild()">
        Add with ViewChild
      </button>
    </div>
  `,
  styles: [`
    .btn {
      margin-top: 18px;
      margin-right: 10px;
    }

    label {
      padding-right: 10px;
    }
  `]
})
export class CockpitComponent {

  newName = '';
  newContent = '';

  @Output() private itemCreated = new EventEmitter<{ name: string, content: string }>();

  @ViewChild('localRef1', {static: false}) private newNameRef: ElementRef;
  @ViewChild('localRef2', {static: false}) private newContentRef: ElementRef;

  onAddItem() {
    this.itemCreated.emit({
      name: this.newName,
      content: this.newContent
    });
  }

  onAddItemWithRefs(localRef1: HTMLInputElement, localRef2: HTMLInputElement) {
    this.itemCreated.emit({
      name: localRef1.value,
      content: localRef2.value
    });
  }

  onAddItemWithViewChild() {
    this.itemCreated.emit({
      name: this.newNameRef.nativeElement.value,
      content: this.newContentRef.nativeElement.value
    });
  }
}
