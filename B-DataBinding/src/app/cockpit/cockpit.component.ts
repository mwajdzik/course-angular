import {Component, ContentChild, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {

  private newName = '';
  private newContent = '';

  @Output() private serverCreated = new EventEmitter<{ name: string, content: string }>();
  @Output() private blueprintCreated = new EventEmitter<{ name: string, content: string }>();

  @ViewChild('localRef1') private newNameRef : ElementRef;
  @ViewChild('localRef2') private newContentRef : ElementRef;

  @ContentChild('contentRef1') private contentRef : ElementRef;

  onAddServer() {
    this.serverCreated.emit({name: this.newName, content: this.newContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({name: this.newName, content: this.newContent});
  }

  onAddServerWithRefs(localRef1: HTMLInputElement, localRef2: HTMLInputElement) {
    this.serverCreated.emit({name: localRef1.value, content: localRef2.value});
  }

  onAddServerWithViewChild() {
    this.serverCreated.emit({name: this.newNameRef.nativeElement.value, content: this.newContentRef.nativeElement.value});
  }
}
