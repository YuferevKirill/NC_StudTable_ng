import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverDirective]'
})
export class HoverDirectiveDirective {

  constructor() { }

  @HostBinding('class.hovered') isHovered = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

}
