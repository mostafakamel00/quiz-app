import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appCahngeBg]',
})
export class CahngeBgDirective {
  @Input() isCorrect: boolean = false;
  constructor(private render: Renderer2, private el: ElementRef) {}
  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background', 'green');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    }
  }
}
