import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  OnChanges
} from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { EnumAware } from '../util/enum-aware.decorator';

@Directive({
  selector: '[appChessPieceIcon]'
})
@EnumAware([{ name: 'IconSet', type: IconSet }])
export class ChessPieceIconDirective implements OnChanges {
  private static readonly IconsSvg = '/assets/icons/icons.svg#';

  @Input('appChessPieceIcon')
  fenChar: string;

  @Input()
  iconSet: IconSet;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnChanges(): void {
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
    return this.fenChar
      ? `${
          ChessPieceIconDirective.IconsSvg
        }${this.iconSet.toLowerCase()}-${this._fenCharToChessPieceIconName()}`
      : '';
  }

  private _fenCharToChessPieceIconName(): string {
    return (
      (this.fenChar === this.fenChar.toUpperCase() ? 'w' : 'b') +
      this.fenChar.toLowerCase()
    );
  }
}
