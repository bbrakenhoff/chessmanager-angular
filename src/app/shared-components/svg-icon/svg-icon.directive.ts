import {
  Directive,
  OnChanges,
  SimpleChanges,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';
import { SvgIcons } from './svg-icons';
@Directive({
  selector: '[appSvgIcon]'
})
export class SvgIconDirective implements OnChanges {
  private static readonly SvgFilePath = '/assets/icons/icons.svg#';

  @Input('appSvgIcon')
  name: SvgIcons;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._renderer.setAttribute(
      this._el.nativeElement,
      'href',
      this.iconPath,
      'xlink'
    );
  }

  private get iconPath() {
    return SvgIconDirective.SvgFilePath + this.name;
  }
}
