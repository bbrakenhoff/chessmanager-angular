import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2
} from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { EnumAware } from '../util/enum-aware.decorator';

@Directive({
  selector: '[appChessPieceIcon]'
})
@EnumAware([{ name: 'IconSet', type: IconSet }])
export class ChessPieceIconDirective implements OnInit {
  private static readonly iconsSvg = '/assets/icons/icons.svg#';

  @Input('appChessPieceIcon')
  fenChar: string;

  @Input()
  iconSet: IconSet;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.iconSet) {
      this.iconSet = IconSet.Alpha;
    }

    this._renderer.setAttribute(
      this._el.nativeElement,
      'href',
      this._iconPath(),
      'xlink'
    );
  }

  private _iconPath(): string {
    return `${ChessPieceIconDirective.iconsSvg}${
      this.iconSet
    }-${this._fenCharToChessPieceIconName()}`;
  }

  private _fenCharToChessPieceIconName(): string {
    return (
      (this.fenChar === this.fenChar.toUpperCase() ? 'w' : 'b') +
      this.fenChar.toLowerCase()
    );
  }
}
