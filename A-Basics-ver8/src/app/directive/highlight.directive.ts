import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'red';

  @HostBinding('style.backgroundColor') backgroundColor: string;

  // noinspection JSUnusedLocalSymbols
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.highlightColor);
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor);
    this.backgroundColor = this.defaultColor;
  }
}
