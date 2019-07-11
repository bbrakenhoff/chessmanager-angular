import {
  Component,
  OnInit,
  Input,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  ChangeDetectorRef
} from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';
import { Chessboard } from 'src/models/chessboard.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit, DoCheck {
  @Input()
  fenPosition: FenPosition;

  private _fenPositionDiffer: KeyValueDiffer<string, any>;

  readonly chessboard: Chessboard =  Chessboard.create();

  constructor(
    private _keyValueDiffers: KeyValueDiffers,
    private _changeDector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._fenPositionDiffer = this._keyValueDiffers
      .find(this.fenPosition)
      .create();
    this.chessboard.reflectFenPosition(this.fenPosition);
  }

  ngDoCheck() {
    const changes = this._fenPositionDiffer.diff(this.fenPosition);
    if (changes) {
      this.chessboard.reflectFenPosition(this.fenPosition);
      this._changeDector.detectChanges();
    }
  }
}
